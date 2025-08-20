import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  usePerformanceMonitoring('Hero Section');
  
  return (
    <section 
      id="home" 
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
      aria-label="Hero section with 3D astronaut"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
        aria-label="Interactive 3D astronaut model"
      >
        <Canvas camera={{ position: [0, 1, 3] }} aria-label="3D Astronaut Scene">
          <Suspense fallback={<Loader is3D={true} />}>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    // Enhanced camera movement with touch support
    const factor = state.viewport.width > 768 ? 10 : 15; // More sensitive on mobile
    easing.damp3(
      state.camera.position,
      [state.mouse.x / factor, 1 + state.mouse.y / factor, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
