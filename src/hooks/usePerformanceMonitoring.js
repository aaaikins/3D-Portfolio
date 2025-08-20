import { useEffect } from 'react';

export const usePerformanceMonitoring = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        // Performance monitoring disabled for cleaner console output
        // console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log slow components (>500ms)
        if (loadTime > 500) {
          console.warn(`⚠️ Slow component detected: ${componentName} took ${loadTime.toFixed(2)}ms to load`);
        }
      }
      
      // In production, you could send this data to an analytics service
      // analytics.track('component_load_time', { componentName, loadTime });
    };
  }, [componentName]);
};

// Simplified web vitals monitoring using Performance Observer API
export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Monitor navigation timing
    const logNavigationTiming = () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation && process.env.NODE_ENV === 'development') {
        // Navigation timing disabled for cleaner console output
        /*
        console.log('🚀 Navigation Timing:', {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalPageLoad: navigation.loadEventEnd - navigation.fetchStart
        });
        */
      }
    };
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (process.env.NODE_ENV === 'development') {
            // Web vitals logging disabled for cleaner console output
            // console.log(`📊 ${entry.entryType}:`, entry.value || entry.duration, 'ms');
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] });
      } catch (e) {
        // Browser doesn't support these metrics
      }
      
      return () => observer.disconnect();
    }
    
    // Fallback for browsers without Performance Observer
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', logNavigationTiming);
    } else {
      logNavigationTiming();
    }
  }, []);
};

export default usePerformanceMonitoring;
