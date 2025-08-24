import CopyEmailButton from "../components/CopyEmailButton";

const About = () => {
  return (
    <section className="c-space section-spacing" id="about">
      <div className="text-center mb-16">
        <h2 className="text-heading mb-6">About Me</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Main Introduction */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hi, I'm Aikins Acheampong
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-aqua font-semibold">Computer Science student</span> at Colby College (Class of 2027)
              </p>
            </div>

            {/* Key Skills */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Full-Stack Development</h4>
                <p className="text-gray-400 text-sm">React, Next.js, Python, Node.js</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">AI Engineering</h4>
                <p className="text-gray-400 text-sm">Machine Learning, TensorFlow, Python</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">☁️</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Cloud Computing</h4>
                <p className="text-gray-400 text-sm">AWS Certified Cloud & AI Practitioner</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Tech Stack</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-semibold text-aqua mb-2">Languages & Frameworks</h5>
                  <p className="text-sm text-gray-300">
                    Python • JavaScript/TypeScript • Java • React • Next.js • Flask
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-aqua mb-2">Tools & Technologies</h5>
                  <p className="text-sm text-gray-300">
                    AWS • MongoDB • PostgreSQL • Git • TensorFlow
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Availability */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-black/30 rounded-xl">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-white font-medium">Based in Maine, USA</span>
                <span className="text-gray-400 ml-2">• Open to remote work</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-4">
                Ready to start a project together?
              </h4>
              <CopyEmailButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
