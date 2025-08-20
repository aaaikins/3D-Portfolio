import React from "react";

const SkeletonLoader = ({ variant = "default", count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className="animate-pulse">
      {variant === "card" && (
        <div className="p-6 bg-gradient-to-b from-storm/50 to-indigo/50 rounded-2xl">
          <div className="h-4 bg-neutral-600 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-neutral-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-neutral-700 rounded w-2/3"></div>
        </div>
      )}
      
      {variant === "project" && (
        <div className="bg-gradient-to-b from-storm/50 to-indigo/50 rounded-2xl p-6">
          <div className="h-48 bg-neutral-600 rounded-lg mb-4"></div>
          <div className="h-6 bg-neutral-600 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-neutral-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-neutral-700 rounded w-5/6 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-neutral-600 rounded-full w-16"></div>
            <div className="h-6 bg-neutral-600 rounded-full w-16"></div>
          </div>
        </div>
      )}
      
      {variant === "experience" && (
        <div className="p-6 bg-gradient-to-b from-storm/50 to-indigo/50 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-neutral-600 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-neutral-600 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-neutral-700 rounded w-1/3 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-neutral-700 rounded w-full"></div>
                <div className="h-3 bg-neutral-700 rounded w-4/5"></div>
                <div className="h-3 bg-neutral-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {variant === "default" && (
        <div className="p-4 bg-gradient-to-b from-storm/50 to-indigo/50 rounded-lg">
          <div className="h-4 bg-neutral-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-neutral-700 rounded w-full mb-1"></div>
          <div className="h-3 bg-neutral-700 rounded w-2/3"></div>
        </div>
      )}
    </div>
  ));

  return (
    <div className="space-y-4" role="status" aria-live="polite" aria-label="Content loading">
      {skeletons}
    </div>
  );
};

export default SkeletonLoader;
