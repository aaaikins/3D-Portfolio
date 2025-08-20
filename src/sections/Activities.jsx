import { motion } from "motion/react";
import { Particles } from "../components/Particles";

const Activities = () => {
  const activities = [
    {
      title: "Colorstack Community",
      role: "Member",
      description: "Promote academic & career success for Black and Latinx CS students.",
      icon: "🌟",
    },
    {
      title: "Amazon - Campus Prep Series",
      role: "SDE Mentee",
      description: "Engaged in hands-on cloud computing labs with Amazon Bedrock; Attended live resume reviews, interview prep, and networking sessions with Amazon engineers and recruiters.",
      icon: "🚀",
    },
    {
      title: "Nvidia - Summer Bridge Series",
      role: "SWE Mentee",
      description: "Completed NVIDIA Summer Bridge Program, gaining hands-on experience with NVIDIA technologies, AI fundamentals, and software engineering best practices.",
      icon: "⚡",
    },
    {
      title: "Codepath",
      role: "Student (June 2024 – August 2024)",
      description: "Completed the technical interview prep course.",
      icon: "💻",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative c-space section-spacing" id="activities">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={50}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      
      <div className="text-center mb-12">
        <h2 className="text-heading">Activities & Leadership</h2>
        <p className="subtext max-w-2xl mx-auto mt-4">
          Engaged in diverse programs and communities that foster professional growth, 
          technical excellence, and meaningful connections in the tech industry.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            className="group relative p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-purple-400 font-medium">
                    {activity.role}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Subtle border animation */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                 style={{ padding: '1px' }}>
              <div className="h-full w-full bg-slate-900 rounded-xl" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Activities;
