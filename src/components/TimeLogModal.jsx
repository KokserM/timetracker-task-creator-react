// src/components/TimeLogModal.jsx
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
import { format } from 'date-fns';

// Use extBrowser so that in Firefox we get `browser`, and in Chrome we fall back to `chrome`
const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

export default function TimeLogModal({
                                         onClose,
                                         initialUser,
                                         initialProjects,
                                         issueKey,
                                         issueSummary,
                                         onSuccess,
                                         showToast,
                                     }) {
    // Basic date/time states
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

    // User, projects, and possible existing task
    const [user, setUser] = useState(initialUser || null);
    const [projects, setProjects] = useState(initialProjects || []);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [existingTask, setExistingTask] = useState(null);

    // Fetch user and projects if not provided
    useEffect(() => {
        if (!user || projects.length === 0) {
            extBrowser.runtime.sendMessage({ action: 'GET_PROJECTS_AND_USER' }, (resp) => {
                if (resp && resp.success) {
                    setUser(resp.user);
                    setProjects(resp.projects);
                } else if (resp && resp.needCredentials) {
                    showToast('Need credentials, please log in first.', 'error');
                } else {
                    showToast(`Error fetching: ${resp?.error}`, 'error');
                }
            });
        }
    }, []);

    // Check if the task already exists for this issue
    useEffect(() => {
        if (user && issueKey && issueSummary) {
            const taskName = `${issueKey} - ${issueSummary}`;
            extBrowser.runtime.sendMessage(
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
                        const found = resp.data[0]; // Found existing task
                        setExistingTask(found);
                        // Also set the project selection based on the found task
                        if (found.project?.id) {
                            setSelectedProjectId(found.project.id);
                        }
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
        let startVal = '';
        let endVal = '';

        if (logTime) {
            const startDateObj = new Date(dateVal);
            startDateObj.setHours(startTimeVal.getHours(), startTimeVal.getMinutes(), 0, 0);

            const endDateObj = new Date(dateVal);
            endDateObj.setHours(endTimeVal.getHours(), endTimeVal.getMinutes(), 0, 0);

            if (startDateObj >= endDateObj) {
                showToast('Start time must be before end time.', 'error');
                return;
            }
            // Format as local time strings (e.g., "2025-02-11T09:00:00")
            startVal = format(startDateObj, "yyyy-MM-dd'T'HH:mm:ss");
            endVal = format(endDateObj, "yyyy-MM-dd'T'HH:mm:ss");
        }

        // If task already exists, log time or simply close
        if (existingTask) {
            if (logTime) {
                doCreateWorklog(existingTask, startVal, endVal);
            } else {
                showToast('Task already exists; no time logged.', 'info');
                onSuccess('Task exists (no time logged)');
            }
            return;
        }

        // Validate project and user existence before creating task
        if (!selectedProjectId) {
            showToast('Please select a project.', 'error');
            return;
        }
        if (!user) {
            showToast('No user found. Please log in first.', 'error');
            return;
        }

        const finalProject = projects.find((p) => p.id === selectedProjectId);
        if (!finalProject) {
            showToast('Selected project not found.', 'error');
            return;
        }

        const taskName = `${issueKey} - ${issueSummary}`;
        extBrowser.runtime.sendMessage(
            {
                action: 'CREATE_TIMETRACKER_TASK',
                payload: { issueKey, issueSummary, project: finalProject },
            },
            (createResp) => {
                if (!createResp) {
                    showToast('No response while creating task.', 'error');
                    return;
                }
                if (!createResp.success) {
                    showToast(`Error creating task: ${createResp.error}`, 'error');
                    return;
                }
                showToast('Task created successfully!', 'success');

                if (logTime) {
                    // After creation, retrieve the new task to log time
                    extBrowser.runtime.sendMessage(
                        {
                            action: 'FIND_TASK_BY_NAME',
                            payload: { taskName, personId: user.id },
                        },
                        (secondFind) => {
                            if (!secondFind) {
                                showToast('No response after task creation.', 'error');
                                return;
                            }
                            if (!secondFind.success || !secondFind.data || secondFind.data.length === 0) {
                                showToast('Newly created task not found.', 'error');
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

    // Logs the worklog for the given task
    function doCreateWorklog(taskObj, startValLocal, endValLocal) {
        extBrowser.runtime.sendMessage(
            {
                action: 'CREATE_WORKLOG',
                payload: {
                    task: taskObj,
                    startTime: startValLocal,
                    endTime: endValLocal,
                    comment,
                    person: user,
                },
            },
            (wlResp) => {
                if (!wlResp) {
                    showToast('No response while logging time.', 'error');
                    return;
                }
                if (wlResp.success) {
                    showToast('Time logged successfully!', 'success');
                    onSuccess();
                } else {
                    showToast(`Error: ${wlResp.error}`, 'error');
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
                        disabled={Boolean(existingTask)}
                        MenuProps={{
                            disablePortal: true,
                            PaperProps: { style: { zIndex: 9999999 } },
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            transformOrigin: { vertical: 'top', horizontal: 'left' },
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
                            renderInput={(params) => <TextField {...params} />}
                            PopperProps={{ style: { zIndex: 9999999 } }}
                            disabled={!logTime}
                        />
                    </div>

                    <div style={styles.field}>
                        <TimePicker
                            label="Start Time"
                            disablePortal
                            value={startTimeVal}
                            onChange={(newTime) => newTime && setStartTimeVal(newTime)}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={false}
                            minutesStep={15}
                            PopperProps={{ style: { zIndex: 9999999 } }}
                            disabled={!logTime}
                        />
                    </div>

                    <div style={styles.field}>
                        <TimePicker
                            label="End Time"
                            disablePortal
                            value={endTimeVal}
                            onChange={(newTime) => newTime && setEndTimeVal(newTime)}
                            renderInput={(params) => <TextField {...params} />}
                            ampm={false}
                            minutesStep={15}
                            PopperProps={{ style: { zIndex: 9999999 } }}
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
                        ? logTime
                            ? 'Log Time'
                            : 'Close'
                        : `Create Task ${logTime ? '/ Log Time' : ''}`}
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
        zIndex: 999999,
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
