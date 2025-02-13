// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

export default function LoginModal({ onClose, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        if (!username || !password) return;

        extBrowser.runtime.sendMessage(
            { action: 'LOGIN', payload: { username, password } },
            (resp) => {
                if (!resp) {
                    console.error('No response from LOGIN');
                    return;
                }
                if (resp.success) {
                    onLoginSuccess(resp.user, resp.projects);
                } else {
                    alert(`Login failed: ${resp.error || 'Unknown error'}`);
                }
            }
        );
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <IconButton sx={styles.closeBtn} onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>

                <div style={{ textAlign: 'center' }}>
                    <img
                        src={extBrowser.runtime.getURL('images/timetrackerlogo.png')}
                        alt="Timetracker"
                        style={{ marginBottom: '10px', maxWidth: '200px' }}
                    />
                </div>

                <TextField
                    label="Username (email)"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ marginBottom: '16px' }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: '16px' }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#355fac',
                        ':hover': { backgroundColor: '#2d4f8a' }
                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        position: 'relative',
        width: '320px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'left'
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px'
    }
};
