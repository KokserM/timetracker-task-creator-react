// src/contentScript.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

(function() {
    console.log('Timetracker React contentScript loaded');

    // Retrieve the Jira issue key and summary
    const issueKeyElement = document.querySelector('#key-val');
    const issueSummaryElement = document.querySelector('#summary-val');
    if (!issueKeyElement || !issueSummaryElement) {
        console.log('Jira elements not found (#key-val or #summary-val).');
        return;
    }
    const issueKey = issueKeyElement.textContent.trim();
    const issueSummary = issueSummaryElement.textContent.trim();

    // Insert our "Create Timetracker Task" button into the Jira toolbar
    const opsbarTransitions = document.querySelector('#opsbar-opsbar-transitions');
    if (!opsbarTransitions) {
        console.log('#opsbar-opsbar-transitions not found.');
        return;
    }
    const createTaskButton = document.createElement('a');
    createTaskButton.id = 'create-timetracker-task';
    createTaskButton.className = 'aui-button toolbar-trigger issueaction-create-timetracker-task';
    createTaskButton.style.backgroundColor = '#355fac';
    createTaskButton.style.color = 'white';
    createTaskButton.href = '#';
    createTaskButton.style.marginLeft = '8px';
    createTaskButton.textContent = 'Create Timetracker Task';
    createTaskButton.style.transition = 'background 0.3s ease';
    createTaskButton.addEventListener('mouseover', () => {
        createTaskButton.style.backgroundColor = '#244b91';
    });
    createTaskButton.addEventListener('mouseout', () => {
        createTaskButton.style.backgroundColor = '#355fac';
    });
    opsbarTransitions.appendChild(createTaskButton);

    // Create a container for our React modals/toasts
    const modalContainer = document.createElement('div');
    modalContainer.id = 'timetracker-react-modal-root';
    document.body.appendChild(modalContainer);

    // Render the main App with issueKey/summary as props
    const root = createRoot(modalContainer);
    root.render(<App issueKey={issueKey} issueSummary={issueSummary} />);

    // When the button is clicked, call the global function in App
    createTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.showTimetrackerModal) {
            window.showTimetrackerModal();
        } else {
            console.error('showTimetrackerModal is not defined.');
        }
    });
})();
