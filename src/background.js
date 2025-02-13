// src/background.js

// Use the correct API: in Firefox, "browser" is defined and returns promises;
// in Chrome (or as a fallback) use "chrome". We assign it to extBrowser.
const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

const TIMETRACKER_BASE_URL = 'https://timetracker.iglu.ee/api';
const TIMETRACKER_LOGIN_URL = `${TIMETRACKER_BASE_URL}/login`;
const TIMETRACKER_TASKS_URL = `${TIMETRACKER_BASE_URL}/tasks`;

/**
 * Helper to safely extract an error message.
 */
function getErrorMessage(err) {
    if (err instanceof Error) return err.message;
    return String(err);
}

/**
 * Logs in with the provided username and password.
 * Always throws an Error object on failure.
 */
async function loginToTimetracker(username, password) {
    console.log('loginToTimetracker: Attempting login for', username);
    const response = await fetch(TIMETRACKER_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('loginToTimetracker error:', errorText);
        throw new Error(`Login failed: ${errorText}`);
    }

    const token = response.headers.get('x-Auth-Token');
    if (!token) {
        throw new Error('No x-Auth-Token found in response headers.');
    }

    await extBrowser.storage.local.set({ timetrackerAuthToken: token });
    console.log('loginToTimetracker: Received token:', token);
    return token;
}

/**
 * Retrieves the current user using the stored token.
 */
async function getCurrentUser() {
    const result = await extBrowser.storage.local.get('timetrackerAuthToken');
    const timetrackerAuthToken = result.timetrackerAuthToken;
    if (!timetrackerAuthToken) {
        throw new Error('NO_TOKEN');
    }

    const response = await fetch(`${TIMETRACKER_BASE_URL}/users/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': timetrackerAuthToken
        }
    });

    if (response.status === 401) {
        throw new Error('TOKEN_INVALID');
    }
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }

    const user = await response.json();
    console.log('getCurrentUser: user object:', user);
    return user;
}

/**
 * Retrieves projects for the given user ID.
 */
async function getProjectsForUser(personId) {
    const result = await extBrowser.storage.local.get('timetrackerAuthToken');
    const timetrackerAuthToken = result.timetrackerAuthToken;
    if (!timetrackerAuthToken) {
        throw new Error('NO_TOKEN');
    }
    const url = `${TIMETRACKER_BASE_URL}/projects?isActive=true&personId=${personId}`;
    console.log('getProjectsForUser: requesting', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': timetrackerAuthToken
        }
    });

    if (response.status === 401) {
        throw new Error('TOKEN_INVALID');
    }
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }

    const projects = await response.json();
    console.log('getProjectsForUser: projects count =', projects.length);
    return projects;
}

/**
 * Returns an object with the current user and their projects.
 */
async function getProjects() {
    const user = await getCurrentUser();
    const projects = await getProjectsForUser(user.id);
    return { user, projects };
}

/**
 * Creates a new Timetracker task.
 */
async function doCreateTask(issueKey, issueSummary, project) {
    const result = await extBrowser.storage.local.get('timetrackerAuthToken');
    const timetrackerAuthToken = result.timetrackerAuthToken;
    if (!timetrackerAuthToken) {
        throw new Error('NO_TOKEN');
    }
    const postData = {
        name: `${issueKey} - ${issueSummary}`,
        type: 'development',
        project
    };

    console.log('doCreateTask: Creating task with payload:', postData);

    const response = await fetch(TIMETRACKER_TASKS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*',
            'x-auth-token': timetrackerAuthToken
        },
        body: JSON.stringify(postData)
    });

    if (response.status === 401) {
        throw new Error('TOKEN_INVALID');
    }
    if (response.status === 400) {
        const errorResponse = await response.json();
        console.error('doCreateTask: 400 error:', errorResponse);
        if (
            Array.isArray(errorResponse) &&
            errorResponse.length > 0 &&
            errorResponse[0].message?.code === 'taskDuplicateKey'
        ) {
            throw new Error('Task already exists in Timetracker!');
        } else {
            throw new Error(JSON.stringify(errorResponse));
        }
    }
    if (!response.ok) {
        const errorText = await response.text();
        console.error('doCreateTask: error text:', errorText);
        throw new Error(errorText);
    }

    const data = await response.json();
    console.log('doCreateTask: (Partial) task created:', data);
    return data;
}

/**
 * Finds a Timetracker task by name for a given user.
 */
async function findTaskByName(taskName, personId) {
    const result = await extBrowser.storage.local.get('timetrackerAuthToken');
    const timetrackerAuthToken = result.timetrackerAuthToken;
    if (!timetrackerAuthToken) {
        throw new Error('NO_TOKEN');
    }
    const encodedName = encodeURIComponent(taskName);
    const url = `${TIMETRACKER_BASE_URL}/calendar/tasks/actions/findByName/${encodedName}?selectedPersonId=${personId}`;
    console.log('findTaskByName: GET', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': timetrackerAuthToken
        }
    });
    if (response.status === 401) {
        throw new Error('TOKEN_INVALID');
    }
    if (!response.ok) {
        throw new Error('Failed to find task by name');
    }

    const resultData = await response.json();
    console.log('findTaskByName: result =', resultData);
    return resultData;
}

/**
 * Builds an array of roles from a roles array.
 */
function buildRoles(rolesArray) {
    let bitMask = "01";
    const userRoles = {};
    for (let i = 0; i < rolesArray.length; i++) {
        const role = rolesArray[i];
        const intCode = parseInt(bitMask, 2);
        userRoles[role] = {
            bitMask: intCode,
            title: role
        };
        bitMask = (intCode << 1).toString(2);
    }
    return Object.values(userRoles);
}

/**
 * Creates a worklog entry.
 */
async function createWorklog(taskFromContent, startTime, endTime, comment, userFromContent) {
    const result = await extBrowser.storage.local.get('timetrackerAuthToken');
    const timetrackerAuthToken = result.timetrackerAuthToken;
    if (!timetrackerAuthToken) {
        throw new Error('NO_TOKEN');
    }

    const finalPerson = {
        id: userFromContent.id,
        fullName: userFromContent.fullName,
        firstName: userFromContent.firstName,
        lastName: userFromContent.lastName,
        roles: buildRoles(userFromContent.roles || []),
        startDate: userFromContent.startDate || null,
        endDate: userFromContent.endDate || null
    };

    const finalTask = {
        id: taskFromContent.id,
        name: taskFromContent.name,
        type: taskFromContent.type,
        project: taskFromContent.project,
        isActive: taskFromContent.isActive,
        hasWorklogs: taskFromContent.hasWorklogs,
        isCommentRequired: taskFromContent.isCommentRequired,
        estimateDevel: taskFromContent.estimateDevel || 0,
        estimateAnal: taskFromContent.estimateAnal || 0,
        estimateTest: taskFromContent.estimateTest || 0,
        estimateBuffer: taskFromContent.estimateBuffer || 0,
        estimateGeneral: taskFromContent.estimateGeneral || 0,
        generalDuration: taskFromContent.generalDuration,
        generalDurationHours: taskFromContent.generalDurationHours,
        firstInGroup: taskFromContent.firstInGroup
    };

    const bodyData = {
        startTime,
        endTime,
        comment: comment || '',
        isPlanlog: false,
        task: finalTask,
        person: finalPerson
    };

    console.log('createWorklog: final payload =>', bodyData);

    const url = `${TIMETRACKER_BASE_URL}/calendar/worklogs`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*',
            'x-auth-token': timetrackerAuthToken
        },
        body: JSON.stringify(bodyData)
    });

    if (response.status === 401) {
        throw new Error('TOKEN_INVALID');
    }
    if (!response.ok) {
        const errorText = await response.text();
        console.error('createWorklog: error text:', errorText);
        throw new Error(errorText);
    }

    const responseText = await response.text();
    let data = {};
    try {
        data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
        console.error('createWorklog: JSON parse error:', e);
    }
    console.log('createWorklog: success response:', data);
    return data;
}

// Listen for messages from content scripts or the UI.
extBrowser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('background.js - onMessage:', request);

    if (request.action === 'GET_PROJECTS_AND_USER') {
        getProjects()
            .then(({ user, projects }) => {
                sendResponse({ success: true, user, projects });
                console.log('GET_PROJECTS_AND_USER success:', user, projects);
            })
            .catch((err) => {
                console.error('GET_PROJECTS_AND_USER error:', err);
                const msg = getErrorMessage(err);
                if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
                    sendResponse({ success: false, needCredentials: true });
                } else {
                    sendResponse({ success: false, error: msg });
                }
            });
        return true;
    }

    if (request.action === 'LOGIN') {
        const { username, password } = request.payload;
        loginToTimetracker(username, password)
            .then(() => getProjects())
            .then(({ user, projects }) => {
                sendResponse({ success: true, user, projects });
            })
            .catch((err) => {
                console.error('LOGIN error:', err);
                const msg = getErrorMessage(err);
                sendResponse({ success: false, error: msg });
            });
        return true;
    }

    if (request.action === 'FIND_TASK_BY_NAME') {
        const { taskName, personId } = request.payload;
        findTaskByName(taskName, personId)
            .then((result) => sendResponse({ success: true, data: result }))
            .catch((err) => {
                console.error('FIND_TASK_BY_NAME error:', err);
                const msg = getErrorMessage(err);
                if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
                    sendResponse({ success: false, needCredentials: true });
                } else {
                    sendResponse({ success: false, error: msg });
                }
            });
        return true;
    }

    if (request.action === 'CREATE_TIMETRACKER_TASK') {
        const { issueKey, issueSummary, project } = request.payload;
        doCreateTask(issueKey, issueSummary, project)
            .then((partialTask) => {
                sendResponse({ success: true, data: partialTask });
            })
            .catch((err) => {
                console.error('CREATE_TIMETRACKER_TASK error:', err);
                const msg = getErrorMessage(err);
                if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
                    sendResponse({ success: false, needCredentials: true });
                } else {
                    sendResponse({ success: false, error: msg });
                }
            });
        return true;
    }

    if (request.action === 'CREATE_WORKLOG') {
        const { task, startTime, endTime, comment, person } = request.payload;
        createWorklog(task, startTime, endTime, comment, person)
            .then((result) => {
                sendResponse({ success: true, data: result });
            })
            .catch((err) => {
                console.error('CREATE_WORKLOG error:', err);
                const msg = getErrorMessage(err);
                if (msg === 'NO_TOKEN' || msg === 'TOKEN_INVALID') {
                    sendResponse({ success: false, needCredentials: true });
                } else {
                    sendResponse({ success: false, error: msg });
                }
            });
        return true;
    }
});
