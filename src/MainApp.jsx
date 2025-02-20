import React from 'react';
import { toast } from 'react-hot-toast';
import LoginModal from './components/LoginModal';
import TimeLogModal from './components/TimeLogModal';

function MainApp({ issueKey, issueSummary, showTimeLog, setShowTimeLog, cachedUser, cachedProjects }) {

    function handleTaskSuccess(message) {
        if (message) {
            toast.success(message);
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
                />
            )}
        </>
    );
}

export default MainApp;