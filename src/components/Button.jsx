import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = {
  primary: {
    base: 'bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-fuchsia text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-royal/25',
    focus: 'focus:ring-royal/50'
  },
  secondary: {
    base: 'border-2 border-white/20 hover:border-aqua/60 hover:bg-aqua/5 hover:text-aqua text-white font-medium backdrop-blur-sm',
    focus: 'focus:ring-aqua/50'
  },
  ghost: {
    base: 'hover:bg-white/10 text-white font-medium',
    focus: 'focus:ring-white/20'
  },
  danger: {
    base: 'bg-gradient-to-r from-coral to-fuchsia hover:from-fuchsia hover:to-coral text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-coral/25',
    focus: 'focus:ring-coral/50'
  },
  success: {
    base: 'bg-gradient-to-r from-mint to-aqua hover:from-aqua hover:to-mint text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-mint/25',
    focus: 'focus:ring-mint/50'
  }
};

const sizeVariants = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-3xl'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const baseClasses = twMerge(
    // Base styles
    'relative inline-flex items-center justify-center gap-3 font-medium transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary',
    'transform hover:scale-[1.02] active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    
    // Variant styles
    buttonVariants[variant]?.base || buttonVariants.primary.base,
    buttonVariants[variant]?.focus || buttonVariants.primary.focus,
    
    // Size styles
    sizeVariants[size] || sizeVariants.md,
    
    // Custom classes
    className
  );

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      whileHover={!disabled && !loading ? { y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.svg
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}

      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="flex-shrink-0">
          {leftIcon}
        </span>
      )}

      {/* Button content */}
      <span className={twMerge(
        'relative z-10 flex items-center gap-2',
        loading && 'opacity-0'
      )}>
        {children}
      </span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="flex-shrink-0 transition-transform group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}

      {/* Hover overlay effect for gradient buttons */}
      {(variant === 'primary' || variant === 'danger' || variant === 'success') && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
      )}
    </motion.button>
  );
};

// Icon components for common use cases
export const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const DownloadIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const SendIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default Button;
