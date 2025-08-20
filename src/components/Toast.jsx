import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ 
    message, 
    type = 'info', 
    duration = 5000, 
    action = null,
    persistent = false 
  }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type, action, persistent };
    
    setToasts(prev => [...prev, newToast]);
    
    if (!persistent) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const value = {
    addToast,
    removeToast,
    clearAllToasts,
    toasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const { id, message, type, action } = toast;

  const variants = {
    success: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      colors: 'bg-gradient-to-r from-mint to-aqua text-white border-mint/20',
      iconBg: 'bg-mint/20'
    },
    error: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      colors: 'bg-gradient-to-r from-coral to-fuchsia text-white border-coral/20',
      iconBg: 'bg-coral/20'
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      colors: 'bg-gradient-to-r from-orange to-sand text-white border-orange/20',
      iconBg: 'bg-orange/20'
    },
    info: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colors: 'bg-gradient-to-r from-royal to-lavender text-white border-royal/20',
      iconBg: 'bg-royal/20'
    }
  };

  const variant = variants[type] || variants.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={twMerge(
        'relative flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-sm border-2 max-w-md w-full',
        variant.colors
      )}
    >
      {/* Icon */}
      <div className={twMerge('flex-shrink-0 p-1 rounded-lg', variant.iconBg)}>
        {variant.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-relaxed">{message}</p>
        
        {/* Action button */}
        {action && (
          <button
            onClick={action.handler}
            className="mt-2 text-xs font-medium underline hover:no-underline opacity-80 hover:opacity-100 transition-opacity"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors group"
        aria-label="Close notification"
      >
        <svg 
          className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white/20"
        animate={{
          borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};

// Toast Container Component
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Helper hook for common toast patterns
export const useNotifications = () => {
  const { addToast } = useToast();

  return {
    success: (message, options = {}) => 
      addToast({ message, type: 'success', ...options }),
    
    error: (message, options = {}) => 
      addToast({ message, type: 'error', ...options }),
    
    warning: (message, options = {}) => 
      addToast({ message, type: 'warning', ...options }),
    
    info: (message, options = {}) => 
      addToast({ message, type: 'info', ...options }),
    
    loading: (message) => 
      addToast({ 
        message, 
        type: 'info', 
        persistent: true,
        icon: (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )
      })
  };
};

export default Toast;
