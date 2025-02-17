import React, { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-hot-toast';

// 1) Import date-fns "format" so we can produce local time strings
import { format } from 'date-fns';

export default function TimeLogModal({
                                         onClose,
                                         initialUser,
                                         initialProjects,
                                         issueKey,
                                         issueSummary,
                                         onSuccess,
                                     }) {
    const [dateVal, setDateVal] = useState(new Date());
    const [startTimeVal, setStartTimeVal] = useState(() => {
        const d = new Date();
        d.setHours(9, 0, 0, 0);
        return d;
    });
    const [endTimeVal, setEndTimeVal] = useState(() => {
        const d = new Date();
        d.setHours(10, 0, 0, 0);
        return d;
    });
    const [comment, setComment] = useState('');
    const [logTime, setLogTime] = useState(false);

    // 2) Store user, projects, and possibly an existing task
    const [user, setUser] = useState(initialUser || null);
    const [projects, setProjects] = useState(initialProjects || []);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [existingTask, setExistingTask] = useState(null);

    /**
     * Step 1: Fetch user and projects if missing
     */
    useEffect(() => {
        if (!user || projects.length === 0) {
            chrome.runtime.sendMessage({ action: 'GET_PROJECTS_AND_USER' }, (resp) => {
                if (resp && resp.success) {
                    setUser(resp.user);
                    setProjects(resp.projects);
                } else if (resp && resp.needCredentials) {
                    toast.error('Need credentials, please log in first.');
                } else {
                    toast.error('Error fetching projects and user.');
                }
            });
        }
    }, []);

    /**
     * Step 2: Once we have a user, call FIND_TASK_BY_NAME to see if the task already exists.
     * If found, store it in existingTask, set the project select accordingly, and disable it.
     */
    useEffect(() => {
        if (user && issueKey && issueSummary) {
            const taskName = `${issueKey} - ${issueSummary}`;
            chrome.runtime.sendMessage(
                {
                    action: 'FIND_TASK_BY_NAME',
                    payload: { taskName, personId: user.id },
                },
                (resp) => {
                    if (!resp) {
                        console.error('No response from FIND_TASK_BY_NAME');
                        return;
                    }
                    if (resp.success && resp.data && resp.data.length > 0) {
                        const found = resp.data[0]; // the existing task
                        setExistingTask(found);
                        // Also set selectedProjectId to the project's id from the existing task
                        if (found.project?.id) {
                            setSelectedProjectId(found.project.id);
                        }
                    } else {
                        // No existing task found, do nothing special
                    }
                }
            );
        }
    }, [user, issueKey, issueSummary]);

    useEffect(() => {
        setLogTime(Boolean(existingTask));
    }, [existingTask]);

    useEffect(() => {
        if (startTimeVal) {
            const updatedEnd = new Date(startTimeVal.getTime());
            updatedEnd.setHours(updatedEnd.getHours() + 1);
            setEndTimeVal(updatedEnd);
        }
    }, [startTimeVal]);

    /**
     * handleCreate: Called when the user presses "Create Task / Log Time"
     */
    function handleCreate() {
        // 3) Build start/end times as local time strings
        let startVal = '';
        let endVal = '';

        // Validate times only if logging time
        if (logTime) {
            const startDateObj = new Date(dateVal);
            startDateObj.setHours(startTimeVal.getHours(), startTimeVal.getMinutes(), 0, 0);

            const endDateObj = new Date(dateVal);
            endDateObj.setHours(endTimeVal.getHours(), endTimeVal.getMinutes(), 0, 0);

            if (startDateObj >= endDateObj) {
                toast.error('Start time must be before end time.');
                return;
            }
            // Format in local time (no trailing "Z") e.g. "2025-02-11T09:00:00"
            startVal = format(startDateObj, "yyyy-MM-dd'T'HH:mm:ss");
            endVal = format(endDateObj, "yyyy-MM-dd'T'HH:mm:ss");
        }

        // If an existing task was found, skip creation entirely
        if (existingTask) {
            if (logTime) {
                doCreateWorklog(existingTask, startVal, endVal);
            } else {
                onSuccess('Task exists (no time logged)');
            }
            return;
        }

        // Otherwise, proceed with normal "create task" logic
        if (!selectedProjectId) {
            toast.error('Please select a project.');
            return;
        }
        if (!user) {
            toast.error('No user found. Please log in first.');
            return;
        }

        const finalProject = projects.find((p) => p.id === selectedProjectId);
        if (!finalProject) {
            toast.error('Selected project not found.');
            return;
        }

        const taskName = `${issueKey} - ${issueSummary}`;
        chrome.runtime.sendMessage(
            {
                action: 'CREATE_TIMETRACKER_TASK',
                payload: { issueKey, issueSummary, project: finalProject },
            },
            (createResp) => {
                if (!createResp) {
                    toast.error('No response while creating task.');
                    return;
                }
                if (!createResp.success) {
                    toast.error(`Error creating task: ${createResp.error}`);
                    return;
                }
                toast.success('Task created successfully!');

                if (logTime) {
                    // After creation, we fetch the newly-created full task object so we can log time
                    chrome.runtime.sendMessage(
                        {
                            action: 'FIND_TASK_BY_NAME',
                            payload: { taskName, personId: user.id },
                        },
                        (secondFind) => {
                            if (!secondFind) {
                                toast.error('No response after task creation.');
                                return;
                            }
                            if (!secondFind.success || !secondFind.data || secondFind.data.length === 0) {
                                toast.error('Newly created task not found.');
                                return;
                            }
                            doCreateWorklog(secondFind.data[0], startVal, endVal);
                        }
                    );
                } else {
                    onSuccess('Task created');
                }
            }
        );
    }

    /**
     * Actually logs the time for the given task.
     */
    function doCreateWorklog(taskObj, startValLocal, endValLocal) {
        chrome.runtime.sendMessage(
            {
                action: 'CREATE_WORKLOG',
                payload: {
                    task: taskObj,
                    startTime: startValLocal, // local time string
                    endTime: endValLocal, // local time string
                    comment,
                    person: user,
                },
            },
            (wlResp) => {
                if (!wlResp) {
                    toast.error('No response while logging time.');
                    return;
                }
                if (wlResp.success) {
                    toast.success('Time logged successfully!');
                    onSuccess();
                } else {
                    toast.error('Error logging time: ' + wlResp.error);
                }
            }
        );
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>
                <h3>
                    Create/Log Timetracker Task for:
                    <br />
                    <span style={{ fontSize: '14px', paddingBottom: '20px', display: 'block' }}>
            {issueKey} - {issueSummary}
          </span>
                </h3>

                <FormControl fullWidth style={styles.field}>
                    <InputLabel id="project-select-label">Project</InputLabel>
                    <Select
                        labelId="project-select-label"
                        value={selectedProjectId}
                        onChange={(evt) => setSelectedProjectId(evt.target.value)}
                        label="Project"
                        disabled={Boolean(existingTask)} // Disable if a task already exists
                        MenuProps={{
                            disablePortal: true,
                            PaperProps: {
                                style: { zIndex: 9999999 },
                            },
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {projects.map((proj) => (
                            <MenuItem key={proj.id} value={proj.id}>
                                {proj.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={logTime}
                            onChange={() => setLogTime((prev) => !prev)}
                        />
                    }
                    label="Log time with task"
                    style={styles.field}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div style={styles.field}>
                        <DatePicker
                            label="Pick Date"
                            disablePortal
                            value={dateVal}
                            onChange={(newVal) => newVal && setDateVal(newVal)}
                            slots={{ textField: TextField }}
                            slotProps={{  popper: {
                                    disablePortal: true,
                                }, }}
                            disabled={!logTime}
                        />
                    </div>

                    <div style={styles.field}>
                        <TimePicker
                            label="Start Time"
                            disablePortal
                            value={startTimeVal}
                            onChange={(newTime) => newTime && setStartTimeVal(newTime)}
                            slots={{ textField: TextField }}
                            ampm={false}
                            minutesStep={15}
                            slotProps={{  popper: {
                                disablePortal: true,
                                }, }}
                            disabled={!logTime}
                        />
                    </div>

                    <div style={styles.field}>
                        <TimePicker
                            label="End Time"
                            disablePortal
                            value={endTimeVal}
                            onChange={(newTime) => newTime && setEndTimeVal(newTime)}
                            slots={{ textField: TextField }}
                            ampm={false}
                            minutesStep={15}
                            slotProps={{  popper: {
                                    disablePortal: true,
                                }, }}
                            disabled={!logTime}
                        />
                    </div>
                </LocalizationProvider>

                

                <TextField
                    label="Comment (optional)"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                    fullWidth
                    style={styles.field}
                    disabled={!logTime}
                />

                <button style={styles.createBtn} onClick={handleCreate}>
                    {existingTask
                        ? // If task already exists, button says "Log Time" or "No Time" depending on checkbox
                        logTime
                            ? 'Log Time'
                            : 'Close'
                        : // Otherwise the original text
                        `Create Task ${logTime ? '/ Log Time' : ''}`
                    }
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999997,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        width: '350px',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
        zIndex: 1000000,
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
    field: {
        marginBottom: '10px',
    },
    createBtn: {
        backgroundColor: '#355fac',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};
