import { Html, useProgress } from "@react-three/drei";
import { motion } from "motion/react";

const Loader = ({ is3D = true, message = "Loading...", variant = "default" }) => {
  const { progress } = useProgress();
  
  // Enhanced 3D Loader for Three.js scenes
  if (is3D) {
    return (
      <Html center className="text-xl font-normal text-center">
        <motion.div 
          className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-primary/80 backdrop-blur-sm border border-white/10" 
          role="status" 
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-aqua/20 rounded-full animate-spin"></div>
            {/* Inner ring */}
            <div className="absolute inset-2 w-12 h-12 border-4 border-t-mint border-l-transparent border-r-transparent border-b-transparent rounded-full animate-spin animate-reverse"></div>
            {/* Center dot */}
            <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-royal to-lavender rounded-full animate-pulse"></div>
          </div>
          <div className="text-center">
            <p className="text-white font-semibold mb-1" aria-label={`Loading progress: ${Math.round(progress)}%`}>
              {Math.round(progress)}% Loaded
            </p>
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-aqua to-mint rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </Html>
    );
  }
  
  // Enhanced Regular loader for page sections
  const LoaderVariants = {
    default: (
      <div className="relative">
        <div className="w-8 h-8 border-4 border-aqua/20 border-t-aqua rounded-full animate-spin"></div>
      </div>
    ),
    dots: (
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-aqua rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    ),
    pulse: (
      <div className="relative">
        <motion.div 
          className="w-8 h-8 bg-gradient-to-r from-royal to-lavender rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-aqua to-mint rounded-full"
          animate={{ scale: [1.2, 1.4, 1.2], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    ),
    skeleton: (
      <div className="w-full max-w-sm space-y-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    )
  };
  
  return (
    <motion.div 
      className="flex items-center justify-center min-h-[200px]" 
      role="status" 
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-4">
        {LoaderVariants[variant] || LoaderVariants.default}
        
        {message && variant !== 'skeleton' && (
          <motion.p 
            className="text-neutral-400 text-sm font-medium" 
            aria-label={message}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

// Inline loader for smaller spaces
export const InlineLoader = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    xs: "w-3 h-3 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };
  
  return (
    <div 
      className={`${sizeClasses[size]} border-aqua/20 border-t-aqua rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
