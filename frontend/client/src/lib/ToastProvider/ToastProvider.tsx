import React, { createContext, useContext, useRef, useState } from 'react';
import Toast from './Toast/Toast';
import ToastPortalWrapper from './ToastPortalWrapper/ToastPortalWrapper';

interface ToastData {
  text: string;
  displayTime?: number;
  color?: string;
}

interface ToastContextType {
  pushToast: (toast: ToastData) => void;
}

const defaultToastContext: ToastContextType = {
  pushToast: () => {
    throw new Error('pushToast() must be called in ToastProvider');
  },
};

const ToastContext = createContext<ToastContextType>(defaultToastContext);

interface ToastState extends ToastData {
  id: number;
}

const DEFAULT_DISPLAY_TIME = 3000;
const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const idCounterRef = useRef(0);

  const pushToast = (newToast: ToastData) => {
    const id = idCounterRef.current++;
    const { displayTime = DEFAULT_DISPLAY_TIME } = newToast;

    setToasts((currentToasts) => {
      return [...currentToasts, { ...newToast, id }];
    });

    setTimeout(() => {
      setToasts((currentToasts) => {
        return currentToasts.filter((toast) => toast.id !== id);
      });
    }, displayTime);
  };

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <ToastPortalWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} displayTime={toast.displayTime ?? DEFAULT_DISPLAY_TIME} color={toast.color}>
            {toast.text}
          </Toast>
        ))}
      </ToastPortalWrapper>
    </ToastContext.Provider>
  );
};

export const usePushToast = () => {
  const { pushToast } = useContext(ToastContext);
  return pushToast;
};

export default ToastProvider;
