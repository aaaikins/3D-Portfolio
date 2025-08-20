import { useState, useMemo } from "react";
import Project from "../components/Project";
import MobileProjectCarousel from "../components/MobileProjectCarousel";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const ProjectFilter = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === category
              ? 'bg-gradient-to-r from-royal to-lavender text-white shadow-lg scale-105'
              : 'bg-storm/50 text-neutral-300 hover:bg-storm hover:text-white hover:scale-105'
          }`}
          aria-pressed={activeFilter === category}
          aria-label={`Filter projects by ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  
  const [preview, setPreview] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract unique categories from projects
  const categories = useMemo(() => {
    const allCategories = ['All'];
    const projectCategories = myProjects.flatMap(project => 
      project.tags.map(tag => tag.name)
    );
    const uniqueCategories = [...new Set(projectCategories)];
    return [...allCategories, ...uniqueCategories];
  }, []);
  
  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return myProjects;
    return myProjects.filter(project => 
      project.tags.some(tag => tag.name === activeFilter)
    );
  }, [activeFilter]);
  
  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <div className="mb-8">
        <h2 className="text-heading">My Selected Projects</h2>
        <p className="subtext mt-4">
          Explore my portfolio of AI-powered applications, full-stack solutions, and cloud-native projects
        </p>
      </div>
      
      <ProjectFilter 
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-8 h-[1px] w-full" />
      
      {/* Mobile Carousel */}
      <MobileProjectCarousel projects={filteredProjects} />
      
      {/* Desktop Grid */}
      <motion.div layout className="space-y-8 hidden md:block">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Project {...project} setPreview={setPreview} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-neutral-400">No projects found for "{activeFilter}"</p>
        </motion.div>
      )}
      
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </section>
  );
};

export default Projects;
