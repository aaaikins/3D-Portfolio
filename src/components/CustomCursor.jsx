import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setCursorVariant("link");
      } else if (target.closest('.project-card')) {
        setCursorVariant("project");
      } else if (target.closest('canvas')) {
        setCursorVariant("3d");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(51, 194, 204, 0.1)",
      border: "2px solid rgba(51, 194, 204, 0.5)"
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: "rgba(51, 194, 204, 0.2)",
      border: "2px solid rgba(51, 194, 204, 0.8)"
    },
    project: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      backgroundColor: "rgba(122, 87, 219, 0.2)",
      border: "2px solid rgba(122, 87, 219, 0.8)"
    },
    "3d": {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8,
      backgroundColor: "rgba(87, 219, 150, 0.2)",
      border: "2px solid rgba(87, 219, 150, 0.8)"
    }
  };

  // Only show custom cursor on non-mobile devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
      style={{
        background: variants[cursorVariant].backgroundColor,
        border: variants[cursorVariant].border
      }}
    />
  );
};

export default CustomCursor;
