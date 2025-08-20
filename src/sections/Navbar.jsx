import { useState, useEffect } from "react";
import { motion } from "motion/react";

function Navigation() {
  return (
    <ul className="nav-ul" role="menubar" aria-label="Main navigation">
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#home"
          role="menuitem"
          aria-label="Go to home section"
        >
          Home
        </a>
      </li>
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#about"
          role="menuitem"
          aria-label="Go to about section"
        >
          About
        </a>
      </li>
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#work"
          role="menuitem"
          aria-label="Go to projects section"
        >
          Projects
        </a>
      </li>
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#experience"
          role="menuitem"
          aria-label="Go to experience section"
        >
          Experience
        </a>
      </li>
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#activities"
          role="menuitem"
          aria-label="Go to activities section"
        >
          Activities
        </a>
      </li>
      <li className="nav-li" role="none">
        <a 
          className="nav-link" 
          href="#contact"
          role="menuitem"
          aria-label="Go to contact section"
        >
          Contact
        </a>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('[data-navbar]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav 
      className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40"
      data-navbar
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-aqua focus:ring-offset-2 focus:ring-offset-primary rounded-sm"
            aria-label="Aikins Acheampong - Home"
          >
            Aikins
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-aqua focus:ring-offset-2 focus:ring-offset-primary rounded-sm p-1 sm:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt=""
              role="presentation"
            />
          </button>
          <div className="hidden sm:flex" role="navigation">
            <Navigation />
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 0.3 }}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="pb-5">
            <Navigation />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
