// src/contentScript.js
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

if (window.matchMedia) {
    window.matchMedia = window.matchMedia.bind(window);
}

function TimetrackerButton() {
    const [hovered, setHovered] = useState(false);

    const buttonStyle = {
        backgroundColor: hovered ? '#244b91' : '#355fac',
        color: 'white',
        marginLeft: '8px',
        transition: 'background 0.3s ease',
        textDecoration: 'none',
    };

    return (
        <a
            id="create-timetracker-task"
            className="aui-button toolbar-trigger issueaction-create-timetracker-task"
            href="#"
            style={buttonStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={(e) => {
                e.preventDefault();
                if (window.showTimetrackerModal) {
                    window.showTimetrackerModal();
                } else {
                    console.error('showTimetrackerModal is not defined.');
                }
            }}
        >
            Create Timetracker Task
        </a>
    );
}

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

    // Create container for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'inline-block';
    opsbarTransitions.appendChild(buttonContainer);

    // Create container for the modal
    const modalContainer = document.createElement('div');
    modalContainer.id = 'timetracker-react-modal-root';
    document.body.appendChild(modalContainer);

    // Render button
    const buttonRoot = createRoot(buttonContainer);
    buttonRoot.render(<TimetrackerButton />);

    // Render App (modal)
    const modalRoot = createRoot(modalContainer);
    modalRoot.render(<App issueKey={issueKey} issueSummary={issueSummary} />);
})();