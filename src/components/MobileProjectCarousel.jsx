import React, { useState, useRef } from "react";
import { motion } from "motion/react";

const SwipeableProjectCard = ({ project, isActive, onSwipe }) => {
  const startX = useRef(0);
  const startY = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!startX.current || !startY.current) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX.current - endX;
    const diffY = startY.current - endY;

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        onSwipe('left'); // Swipe left (next)
      } else {
        onSwipe('right'); // Swipe right (previous)
      }
    }
  };

  return (
    <motion.div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 cursor-grab active:cursor-grabbing ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
      }`}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'linear-gradient(to bottom, var(--color-storm), var(--color-indigo))'
      }}
    >
      <div className="p-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-neutral-300"
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-royal to-lavender text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
          </a>
          
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-neutral-600 rounded-full" />
            <div className="w-2 h-2 bg-neutral-600 rounded-full" />
            <div className="w-8 h-2 bg-aqua rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Swipe indicators */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-20 pointer-events-none">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-20 pointer-events-none">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
};

const MobileProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else if (direction === 'right') {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="md:hidden">
      <div className="mb-6">
        <SwipeableProjectCard
          project={projects[currentIndex]}
          isActive={true}
          onSwipe={handleSwipe}
        />
      </div>
      
      {/* Dot indicators */}
      <div className="flex justify-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-aqua scale-125'
                : 'bg-neutral-600 hover:bg-neutral-500'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Swipe hint */}
      <motion.p
        className="text-center text-xs text-neutral-500 mt-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Swipe left or right to explore more projects
      </motion.p>
    </div>
  );
};

export default MobileProjectCarousel;
