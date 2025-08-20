import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className,
  labelClassName,
  inputClassName,
  id,
  name,
  autoComplete,
  leftIcon,
  rightIcon,
  rows,
  maxLength,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value));
  
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setHasValue(Boolean(newValue));
    onChange?.(e);
  };

  const inputClasses = twMerge(
    // Base styles
    'w-full px-4 py-3 text-sm bg-white/5 backdrop-blur-sm transition-all duration-300',
    'placeholder-neutral-500 text-white rounded-xl border-2',
    'focus:outline-none focus:ring-0',
    
    // State-based styles
    error 
      ? 'border-coral focus:border-coral/80 bg-coral/5' 
      : success 
        ? 'border-mint focus:border-mint/80 bg-mint/5'
        : 'border-white/10 focus:border-aqua/50 hover:border-white/20',
    
    // Focus glow effect
    !error && !success && 'focus:shadow-lg focus:shadow-aqua/10',
    error && 'focus:shadow-lg focus:shadow-coral/10',
    success && 'focus:shadow-lg focus:shadow-mint/10',
    
    // Icon padding
    leftIcon && 'pl-12',
    rightIcon && 'pr-12',
    
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed bg-white/5',
    
    inputClassName
  );

  const labelClasses = twMerge(
    'block text-sm font-medium mb-2 transition-colors duration-200',
    error ? 'text-coral' : success ? 'text-mint' : 'text-neutral-300',
    required && 'after:content-["*"] after:text-coral after:ml-1',
    labelClassName
  );

  const containerClasses = twMerge(
    'relative',
    className
  );

  const Component = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <Component
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          rows={type === 'textarea' ? rows || 4 : undefined}
          maxLength={maxLength}
          className={inputClasses}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none">
            {rightIcon}
          </div>
        )}

        {/* Focus ring animation */}
        <AnimatePresence>
          {isFocused && !error && !success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 rounded-xl ring-2 ring-aqua/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Helper text, error, or success message */}
      <AnimatePresence mode="wait">
        {(error || success || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-2"
          >
            {error && (
              <div className="flex items-center gap-2 text-sm text-coral">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {error}
              </div>
            )}
            
            {success && !error && (
              <div className="flex items-center gap-2 text-sm text-mint">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            )}
            
            {helperText && !error && !success && (
              <p className="text-sm text-neutral-400">
                {helperText}
              </p>
            )}
            
            {/* Character counter */}
            {maxLength && (
              <div className="text-xs text-neutral-500 text-right mt-1">
                {value?.length || 0} / {maxLength}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

// Common icons for inputs
export const EmailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

export const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const MessageIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default Input;
