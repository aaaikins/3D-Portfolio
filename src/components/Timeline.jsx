"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <div className="mb-12">
        <h2 className="text-heading">My Work Experience</h2>
        <p className="subtext mt-4">
          From teaching computer science to building AI-powered applications
        </p>
      </div>
      
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            onViewportEnter={() => setActiveIndex(index)}
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <motion.div 
                className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <div 
                  className={`w-4 h-4 p-2 border rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-aqua to-mint border-aqua' 
                      : 'bg-neutral-800 border-neutral-700'
                  }`} 
                />
              </motion.div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <motion.h3 
                  className="group-hover:text-aqua transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {item.date}
                </motion.h3>
                <motion.h3 
                  className="text-3xl text-neutral-400 group-hover:text-white transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {item.title}
                </motion.h3>
                <motion.h3 
                  className="text-3xl text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                >
                  {item.job}
                </motion.h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden">
                <h3 className="group-hover:text-aqua transition-colors duration-300">{item.date}</h3>
                <h3 className="group-hover:text-white transition-colors duration-300">{item.title}</h3>
                <h3 className="group-hover:text-neutral-300 transition-colors duration-300">{item.job}</h3>
              </div>
              
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0.7 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {item.contents.map((content, contentIndex) => (
                  <motion.p 
                    className="mb-3 font-normal text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 relative"
                    key={contentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: contentIndex * 0.1 }}
                    whileHover={{ x: 10, color: "#ffffff" }}
                  >
                    <span className="absolute -left-4 top-2 w-1 h-1 bg-aqua rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {content}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-royal via-lavender to-aqua from-[0%] via-[50%] to-[100%] rounded-full shadow-lg shadow-aqua/20"
          />
        </div>
      </div>
    </div>
  );
};
