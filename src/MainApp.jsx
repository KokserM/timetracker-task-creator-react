import React from 'react';
import { toast } from 'react-hot-toast';
import LoginModal from './components/LoginModal';
import TimeLogModal from './components/TimeLogModal';
//import { useToast } from './components/Toast';

function MainApp({ issueKey, issueSummary, showTimeLog, setShowTimeLog, cachedUser, cachedProjects }) {
    //const { addToast } = useToast();

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