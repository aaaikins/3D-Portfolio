import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startCount = 0;
    
    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startCount + (end - startCount) * easeOutQuart);
      
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

const AnimatedStatistics = () => {
  const stats = [
    {
      value: 5,
      suffix: "+",
      label: "Major Projects",
      description: "AI-powered and full-stack applications"
    },
    {
      value: 2,
      suffix: "",
      label: "AWS Certifications",
      description: "Cloud Practitioner & AI Practitioner"
    },
    {
      value: 50,
      suffix: "+",
      label: "Students Helped",
      description: "As a Teaching Assistant at Colby College"
    },
    {
      value: 10,
      suffix: "+",
      label: "Technologies",
      description: "From React to AWS, Python to TypeScript"
    }
  ];

  return (
    <section className="c-space py-20">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">By the Numbers</h3>
        <p className="subtext max-w-2xl mx-auto">
          A glimpse into my journey as a computer science student and developer
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-aqua to-mint bg-clip-text text-transparent">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-aqua/20 to-mint/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <h4 className="text-lg font-semibold text-white mt-2 mb-1">
              {stat.label}
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedStatistics;
