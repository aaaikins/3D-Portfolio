import React, { Suspense, lazy } from "react";
import Navbar from "./sections/Navbar";
import Loader from "./components/Loader";
import SkeletonLoader from "./components/SkeletonLoader";
import ErrorBoundary from "./components/ErrorBoundary";
import CustomCursor from "./components/CustomCursor";
import { ToastProvider } from "./components/Toast";
import { useWebVitals } from "./hooks/usePerformanceMonitoring";

// Lazy load sections for better performance
const Hero = lazy(() => import("./sections/Hero"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Activities = lazy(() => import("./sections/Activities"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => {
  // Monitor web vitals in development
  useWebVitals();

  return (
    <ToastProvider>
      <ErrorBoundary>
        <CustomCursor />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="container mx-auto max-w-7xl">
          <Navbar />
          <main role="main" id="main-content">
            <Suspense fallback={<Loader is3D={false} message="Loading hero section..." />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<div className="c-space section-spacing"><SkeletonLoader variant="card" count={3} /></div>}>
              <About />
            </Suspense>
            <Suspense fallback={<div className="c-space section-spacing"><SkeletonLoader variant="project" count={2} /></div>}>
              <Projects />
            </Suspense>
            <Suspense fallback={<div className="c-space section-spacing"><SkeletonLoader variant="experience" count={3} /></div>}>
              <Experiences />
            </Suspense>
            <Suspense fallback={<div className="c-space section-spacing"><SkeletonLoader variant="card" count={4} /></div>}>
              <Activities />
            </Suspense>
            <Suspense fallback={<div className="c-space section-spacing"><SkeletonLoader variant="card" count={1} /></div>}>
              <Contact />
            </Suspense>
            <Suspense fallback={<div className="c-space"><SkeletonLoader variant="default" count={1} /></div>}>
              <Footer />
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  );
};

export default App;
