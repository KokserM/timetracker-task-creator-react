// src/contentScript.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

(function() {
    console.log('Timetracker React contentScript loaded');

    const issueKeyElement = document.querySelector('#key-val');
    const issueSummaryElement = document.querySelector('#summary-val');
    if (!issueKeyElement || !issueSummaryElement) {
        console.log('Jira elements not found (#key-val or #summary-val).');
        return;
    }
    const issueKey = issueKeyElement.textContent.trim();
    const issueSummary = issueSummaryElement.textContent.trim();

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

    const modalContainer = document.createElement('div');
    modalContainer.id = 'timetracker-react-modal-root';
    document.body.appendChild(modalContainer);

    const root = createRoot(modalContainer);
    root.render(<App issueKey={issueKey} issueSummary={issueSummary} />);

    createTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.showTimetrackerModal) {
            window.showTimetrackerModal();
        } else {
            console.error('showTimetrackerModal is not defined.');
        }
    });
})();
