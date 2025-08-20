import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import AnimatedStatistics from "../components/AnimatedStatistics";
import SkillsRadarChart from "../components/SkillsRadarChart";

const About = () => {
  const grid2Container = useRef();
  
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10 max-w-md">
            <p className="headtext mb-4">Hi, I'm Aikins Acheampong</p>
            <div className="space-y-3">
              <p className="subtext text-base leading-relaxed">
                <span className="font-semibold text-white">Computer Science student</span> at Colby College (Class of 2027)
              </p>
              <p className="subtext text-sm leading-relaxed">
                Hands-on experience in <span className="text-aqua">full-stack development</span>, 
                <span className="text-aqua"> AI engineering</span>, and <span className="text-aqua">cloud computing</span>.
              </p>
              <div className="flex items-center space-x-2 pt-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <p className="text-xs font-medium text-gray-300">
                  AWS Certified Cloud & AI Practitioner
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              AI & CLOUD
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="AWS Certified"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="Python"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="React/Next.js"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Cloud Practitioner"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="AI Practitioner"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/javascript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/microsoft.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 - Location */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-full h-full flex flex-col justify-center items-start px-6">
            <div className="mb-8">
              <p className="headtext text-white mb-6">Location</p>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-xl font-semibold text-white">
                    Based in Maine, USA
                  </p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Open to remote opportunities worldwide
                </p>
              </div>
            </div>
          </div>
          <figure className="absolute right-6 top-6 bottom-6 w-2/5 flex items-center justify-center opacity-80">
            <div className="scale-90 md:scale-100">
              <Globe />
            </div>
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 - Tech Stack */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[55%] h-full flex flex-col justify-center">
            <p className="headtext mb-6">Tech Stack</p>
            
            <div className="space-y-4">
              {/* Programming Languages */}
              <div>
                <h4 className="text-sm font-semibold text-aqua mb-2">Programming Languages</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Python • JavaScript/TypeScript • Java • C • SQL • Go
                </p>
              </div>
              
              {/* Technologies & Frameworks */}
              <div>
                <h4 className="text-sm font-semibold text-aqua mb-2">Technologies & Frameworks</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  AWS • Flask • Node.js • Next.js • React.js • Tailwind CSS
                </p>
              </div>
              
              {/* Databases & Tools */}
              <div>
                <h4 className="text-sm font-semibold text-aqua mb-2">Databases & Tools</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  MongoDB • PostgreSQL • REST APIs • TensorFlow
                </p>
              </div>
              
              {/* Certifications */}
              <div className="pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm font-medium text-white">
                    AWS Certified Cloud Practitioner & AI Practitioner
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[55%] md:scale-110">
            <Frameworks />
          </div>
        </div>
      </div>
      
      <AnimatedStatistics />
      
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Technical Expertise</h3>
          <p className="subtext max-w-2xl mx-auto">
            A visual representation of my proficiency across different technical domains
          </p>
        </div>
        <div className="flex justify-center">
          <SkillsRadarChart />
        </div>
      </div>
    </section>
  );
};

export default About;
