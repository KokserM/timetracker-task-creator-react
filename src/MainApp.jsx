import React from 'react';
import LoginModal from './components/LoginModal';
import TimeLogModal from './components/TimeLogModal';
import { useToast } from './components/Toast';

function MainApp({ issueKey, issueSummary, showTimeLog, setShowTimeLog, cachedUser, cachedProjects }) {
    const { addToast } = useToast();

    function handleTaskSuccess(message) {
        if (message) {
            addToast(message, 'success');
        }
        setShowTimeLog(false);
    }

    return (
        <>
            {showTimeLog && (
                <TimeLogModal
                    onClose={() => setShowTimeLog(false)}
                    initialUser={cachedUser}
                    initialProjects={cachedProjects}
                    issueKey={issueKey}
                    issueSummary={issueSummary}
                    onSuccess={handleTaskSuccess}
                    showToast={addToast}
                />
            )}
        </>
    );
}

export default MainApp;
