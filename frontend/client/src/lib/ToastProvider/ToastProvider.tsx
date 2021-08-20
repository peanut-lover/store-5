import Portal from '@src/portal/portal';
import React, { createContext, useContext, useRef, useState } from 'react';
import Toast from './Toast/Toast';
import ToastProtalWrapper from './ToastPortalWrapper/ToastProtalWrapper';

interface ToastContextType {
  pushToast: (toast: ToastState, displayTime?: number) => void;
}

const defaultToastContext: ToastContextType = {
  pushToast: () => {
    throw new Error('pushToast() must be called in ToastProvider');
  },
};

const ToastContext = createContext<ToastContextType>(defaultToastContext);

interface ToastState {
  id?: number;
  text: string;
  displayTime?: number;
  color?: string;
}
const DEFAULT_DISPLAY_TIME = 3000;
const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const idCounterRef = useRef(0);

  const pushToast = (newToast: ToastState) => {
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
      <ToastProtalWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} displayTime={toast.displayTime ?? DEFAULT_DISPLAY_TIME} color={toast.color}>
            {toast.text}
          </Toast>
        ))}
      </ToastProtalWrapper>
    </ToastContext.Provider>
  );
};

export const usePushToast = () => {
  const { pushToast } = useContext(ToastContext);
  return pushToast;
};

export default ToastProvider;
