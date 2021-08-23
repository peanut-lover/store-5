import React, { createContext, useContext, useRef, useState } from 'react';
import Toast from './Toast/Toast';
import ToastPortalWrapper from './ToastPortalWrapper/ToastPortalWrapper';

/**
 * displayTime unit is milliseconds
 */
interface ToastData {
  text: string;
  displayTime?: number;
  color?: string;
  positionRow?: 'left' | 'center' | 'right';
  positionColumn?: 'top' | 'bottom';
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
  onDisplayTimeEnd: () => void;
}

const DEFAULT_DISPLAY_TIME = 3000;

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const idCounterRef = useRef(0);

  const pushToast = (newToast: ToastData) => {
    const id = idCounterRef.current++;

    const onDisplayTimeEnd = () => {
      setToasts((currentToasts) => {
        return currentToasts.filter((toast) => toast.id !== id);
      });
    };

    setToasts((currentToasts) => {
      return [...currentToasts, { ...newToast, id, onDisplayTimeEnd }];
    });
  };

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <ToastPortalWrapper>
        {toasts.map(({ id, displayTime, color, onDisplayTimeEnd, text, positionRow, positionColumn }) => (
          <Toast
            key={id}
            displayTime={displayTime ?? DEFAULT_DISPLAY_TIME}
            color={color}
            onDisplayTimeEnd={onDisplayTimeEnd}
            positionRow={positionRow}
            positionColumn={positionColumn}
          >
            {text}
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
