import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4200);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const styles: Record<ToastType, { container: string; icon: React.ReactNode }> = {
    success: {
      container: 'bg-slate-900/95 border-emerald-500/35 text-emerald-200 shadow-emerald-900/30',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    },
    warning: {
      container: 'bg-amber-950/95 border-amber-500/35 text-amber-200 shadow-amber-900/30',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
    },
    info: {
      container: 'bg-indigo-950/95 border-indigo-500/35 text-indigo-200 shadow-indigo-900/30',
      icon: <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />,
    },
    error: {
      container: 'bg-rose-950/95 border-rose-500/35 text-rose-200 shadow-rose-900/30',
      icon: <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map(t => {
          const { container, icon } = styles[t.type];
          return (
            <div
              key={t.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 pr-3 rounded-2xl
                shadow-2xl border backdrop-blur-xl text-xs font-medium
                animate-toast-in
                ${container}`}
            >
              {icon}
              <div className="flex-1 leading-snug font-medium pr-1">{t.message}</div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-current opacity-40 hover:opacity-80 shrink-0 transition-opacity ml-1 mt-0.5"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg: string) => console.log('[Toast]', msg),
    };
  }
  return context;
};
