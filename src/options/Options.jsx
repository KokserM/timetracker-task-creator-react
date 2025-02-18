import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';

const extBrowser = (typeof browser !== 'undefined') ? browser : chrome;

export default function Options() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        // Load saved username
        extBrowser.storage.sync.get(['timetrackerUsername'], (result) => {
            if (result.timetrackerUsername) {
                setCredentials(prev => ({
                    ...prev,
                    username: result.timetrackerUsername
                }));
            }
        });
    }, []);

    const handleSave = () => {
        if (!credentials.username || !credentials.password) {
            toast.error('Please fill in both fields');
            return;
        }

        // Save credentials
        extBrowser.storage.sync.set({
            timetrackerUsername: credentials.username,
            timetrackerPassword: credentials.password
        }, () => {
            toast.success('Credentials saved');
        });
    };

    return (
        <Box sx={{ p: 3, maxWidth: 400, margin: '0 auto' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
                Timetracker Extension Settings
            </Typography>

            <TextField
                fullWidth
                label="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    username: e.target.value
                }))}
                margin="normal"
            />

            <TextField
                fullWidth
                type="password"
                label="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    password: e.target.value
                }))}
                margin="normal"
            />

            <Button
                variant="contained"
                onClick={handleSave}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
            <Toaster
                position="top-right"
            />
        </Box>
    );
}