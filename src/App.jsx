import React, { useState, useEffect } from 'react';
import MainApp from './MainApp';
import ToastProvider from './components/Toast';
import LoginModal from './components/LoginModal';

function App(props) {
    const [showTimeLog, setShowTimeLog] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [cachedUser, setCachedUser] = useState(null);
    const [cachedProjects, setCachedProjects] = useState([]);

    useEffect(() => {
        window.showTimetrackerModal = () => {
            chrome.runtime.sendMessage({ action: 'GET_PROJECTS_AND_USER' }, (resp) => {
                if (!resp) {
                    console.error('No response from background.');
                    return;
                }
                if (resp.success) {
                    setCachedUser(resp.user);
                    setCachedProjects(resp.projects);
                    setShowTimeLog(true);
                } else if (resp.needCredentials) {
                    setShowLogin(true);
                } else {
                    console.error(`Error: ${resp.error}`);
                }
            });
        };
    }, []);

    function handleLoginSuccess(user, projects) {
        setCachedUser(user);
        setCachedProjects(projects);
        setShowLogin(false);
        setShowTimeLog(true);
    }

    return (
        <ToastProvider>
            <MainApp
                {...props}
                showTimeLog={showTimeLog}
                setShowTimeLog={setShowTimeLog}
                cachedUser={cachedUser}
                cachedProjects={cachedProjects}
            />
            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </ToastProvider>
    );
}

export default App;