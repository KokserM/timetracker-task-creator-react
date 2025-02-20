import React, { useState, useEffect } from 'react';
import MainApp from './MainApp';
import { Toaster } from 'react-hot-toast';
import LoginModal from './components/LoginModal';
import CssBaseline from '@mui/material/CssBaseline';

// Use extBrowser to support both Firefox and Chrome.
const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

function App(props) {
    const [showTimeLog, setShowTimeLog] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [cachedUser, setCachedUser] = useState(null);
    const [cachedProjects, setCachedProjects] = useState([]);

    useEffect(() => {
        window.showTimetrackerModal = () => {
            extBrowser.runtime.sendMessage({ action: 'GET_PROJECTS_AND_USER' }, (resp) => {
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
        <>
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
            <Toaster
                position="top-right"
                containerStyle={{
                    zIndex: 1000000
                }}
            />
        </>
    );
}

export default App;