import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import App from './App';

function TimetrackerButton() {
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);
    const handleClick = (e) => {
        e.preventDefault();
        if (window.showTimetrackerModal) {
            window.showTimetrackerModal();
        } else {
            console.error('showTimetrackerModal is not defined.');
        }
    };

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
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        >
            Create Timetracker Task
        </a>
    );
}

function PortalButton() {
    const [target, setTarget] = useState(null);

    useEffect(() => {
        // Locate the Jira toolbar element
        const opsbar = document.querySelector('#opsbar-opsbar-transitions');
        if (opsbar) {
            setTarget(opsbar);
        }
    }, []);

    // Render the button into Jira's toolbar if the target is available
    if (!target) return null;
    return createPortal(<TimetrackerButton />, target);
}

// Inject the portal in your content script
(function() {
    console.log('Content script loaded');

    // Retrieve the Jira issue key and summary
    const issueKeyElement = document.querySelector('#key-val');
    const issueSummaryElement = document.querySelector('#summary-val');
    if (!issueKeyElement || !issueSummaryElement) {
        console.log('Jira elements not found (#key-val or #summary-val).');
        return;
    }
    const issueKey = issueKeyElement.textContent.trim();
    const issueSummary = issueSummaryElement.textContent.trim();

    // Create a main container for React
    const container = document.createElement('div');
    container.id = 'timetracker-react-container';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
        <>
            <PortalButton />
            <App issueKey={issueKey} issueSummary={issueSummary} />
        </>
    );
})();