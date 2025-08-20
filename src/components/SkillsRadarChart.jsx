import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SkillsRadarChart = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const skills = [
    { name: "JavaScript/TypeScript", level: 92 },
    { name: "Python", level: 88 },
    { name: "React/Next.js", level: 90 },
    { name: "AWS/Cloud", level: 85 },
    { name: "AI/ML", level: 78 },
    { name: "Node.js", level: 82 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 80;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid circles with better visibility
      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i === 5 ? 'rgba(115, 115, 115, 0.4)' : `rgba(115, 115, 115, ${0.25 - i * 0.03})`;
        ctx.lineWidth = i === 5 ? 1.5 : 1;
        ctx.stroke();
      }

      // Draw grid lines
      const angleStep = (Math.PI * 2) / skills.length;
      skills.forEach((_, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(115, 115, 115, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw skill polygon
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      
      // Fill the polygon with improved gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(51, 194, 204, 0.4)');
      gradient.addColorStop(0.7, 'rgba(87, 219, 150, 0.2)');
      gradient.addColorStop(1, 'rgba(87, 219, 150, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Stroke the polygon with better visibility
      ctx.strokeStyle = 'rgba(51, 194, 204, 0.9)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw skill points with better visibility
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 194, 204, 0.3)';
        ctx.fill();
        
        // Main point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#33c2cc';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw skill labels with better positioning and visibility
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const labelRadius = maxRadius + 50;
        const x = centerX + Math.cos(angle) * labelRadius;
        const y = centerY + Math.sin(angle) * labelRadius;
        
        // Save context for text styling
        ctx.save();
        
        // Set text properties with fallback fonts
        ctx.font = 'bold 14px "Inter", "Helvetica", "Arial", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        
        // Adjust text alignment based on position
        if (x < centerX - 30) {
          ctx.textAlign = 'right';
        } else if (x > centerX + 30) {
          ctx.textAlign = 'left';
        } else {
          ctx.textAlign = 'center';
        }
        
        // Draw skill name with shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(skill.name, x, y - 8);
        
        // Reset shadow and draw percentage
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillStyle = '#33c2cc';
        ctx.font = 'bold 12px "Inter", "Helvetica", "Arial", sans-serif';
        ctx.fillText(`${skill.level}%`, x, y + 10);
        
        // Restore context
        ctx.restore();
      });
    };

    // Animate the chart appearance
    let progress = 0;
    const animationDuration = 2000;
    const startTime = Date.now();

    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / animationDuration, 1);
      
      // Animate skill levels
      const animatedSkills = skills.map(skill => ({
        ...skill,
        level: skill.level * progress
      }));
      
      // Temporarily update skills for animation
      const originalSkills = [...skills];
      skills.splice(0, skills.length, ...animatedSkills);
      animate();
      skills.splice(0, skills.length, ...originalSkills);
      
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        animate(); // Final render with actual values
      }
    };

    animateFrame();
  }, [isVisible]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 20px rgba(51, 194, 204, 0.3))' }}
        />
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-aqua to-mint bg-clip-text text-transparent">
              Skills
            </div>
            <div className="text-sm text-neutral-400">Proficiency Level</div>
          </div>
        </div>
      </motion.div>
      
      <p className="text-center text-sm text-neutral-400 mt-4 max-w-md">
        Interactive radar chart showing my technical expertise across different domains
      </p>
    </div>
  );
};

export default SkillsRadarChart;
