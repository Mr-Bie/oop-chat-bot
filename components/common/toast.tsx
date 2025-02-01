'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Define the type for the context
interface ToastContextType {
  showToast: (
    message: string,
    severity?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

// Define the initial context value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to access the ToastContext
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Define the type for the toast state
interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

// Props type for the provider
interface ToastProviderProps {
  children: ReactNode;
}

// ToastProvider component
export default function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Method to show the toast
  const showToast = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  // Method to close the toast
  const handleClose = () => {
    setToast((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{ className: 'font-yekanbakh rounded-full' }}
        className="font-yekanbakh rounded-full"
        sx={{ display: 'flex', gap: '0.2rem' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: '100%', display: 'flex', gap: '0.5rem' }}
          className="font-yekanbakh"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
