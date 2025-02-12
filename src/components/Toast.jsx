import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        // Generate a guaranteed-unique ID.
        // (If crypto.randomUUID() is not supported, use some other unique ID strategy.)
        const id = crypto.randomUUID();

        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={styles.toastContainer}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{
                            ...styles.toast,
                            ...(toast.type === 'error' ? styles.error : styles.success),
                        }}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const styles = {
    toastContainer: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000000
    },
    toast: {
        marginBottom: '8px',
        padding: '8px 16px',
        borderRadius: '4px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    },
    success: {
        backgroundColor: '#4CAF50'
    },
    error: {
        backgroundColor: '#f44336'
    }
};

export default ToastProvider;
