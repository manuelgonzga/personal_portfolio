import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiChevronRight, FiChevronLeft } from "react-icons/fi";

const projects = [
  {
    title: "Parlot Language Platform",
    description:
      "This project is designed for online language learning. It was developed as part of an academic assignment together with classmates, using modern technologies such as Java, Spring Boot, and Maven.",
    github: "https://github.com/manuelgonzga/g3-Parlot",
    youtube: "https://www.youtube.com/embed/eOsQ2-o2ijI",
  },
  {
    title: "Mini Unix Shell",
    description:
      "Simplified shell written in C that simulates a basic Bash-like command interpreter, supporting foreground/background commands, signals, job control, and built-in commands like cd and logout.",
    github: "https://github.com/manuelgonzga/shellSO_CA69",
    youtube: "https://www.youtube.com/embed/PvGi0WuDasM",
  },
  {
    title: "Personal Portfolio",
    description:
      "Personal portfolio built with React for dynamic UI, styled using Tailwind CSS for a modern and responsive design, and powered by Vite for fast development and optimized build performance.",
    github: "https://github.com/manuelgonzga/personal_portfolio",
    youtube: "https://www.youtube.com/embed/JWUqel50S1M",
  },
  {
    title: "Generala Dice Game",
    description:
      "This project is a simulation of the dice game Generala, implemented in Python 3, using multithreading to run and compare the performance of different playing strategies. It was developed in collaboration with classmates.",
    github: "https://github.com/manuelgonzga/generala_game",
    youtube: "https://www.youtube.com/embed/cxmAmxS21R0",
  },
  {
    title: "Emprecicla",
    description:
      "Emprecicla is an Angular-based web app (TypeScript, HTML, CSS) that connects users and businesses to promote recycling and sustainable material management.",
    github: "https://github.com/manuelgonzga/emprecicla-main",
    youtube: "https://www.youtube.com/embed/2mmgG0lWt1E",
  },
  {
    title: "Tic-Tac-Toe Multiplayer",
    description:
      "This project is a network-based implementation of the classic Tic-Tac-Toe game using Python. It was developed collaboratively with classmates as part of a Distributed Systems course assignment.",
    github: "https://github.com/manuelgonzga/tateti_SSDD",
    youtube: "https://www.youtube.com/embed/AHIeSqH7jTs",
  },
];

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="projects" className="py-16 px-4 bg-transparent text-white relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-violet-400 mt-10">
        My Projects
      </h2>

      {/* Flechas indicadoras SOLO en móvil, centradas verticalmente */}
      {isMobile && (
        <>
          <div
            aria-hidden="true"
            className="absolute left-2 select-none pointer-events-none text-violet-400 opacity-60"
            style={{ fontSize: "2rem", top: "60%", transform: "translateY(-50%)", position: "absolute" }}
          >
            <FiChevronLeft className="animate-slideLeftRight" />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-2 select-none pointer-events-none text-violet-400 opacity-60"
            style={{ fontSize: "2rem", top: "60%", transform: "translateY(-50%)", position: "absolute" }}
          >
            <FiChevronRight className="animate-slideLeftRight" />
          </div>
        </>
      )}

      <div
        className={`flex overflow-x-auto space-x-6 px-4
          scroll-snap-x mandatory
          md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-10 md:space-x-0 md:px-0
          max-w-6xl mx-auto
          mad:min-h-[950px]
        `}
        style={{ overflowY: "hidden" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gray-800 min-w-[280px] min-h-[440px] rounded-2xl shadow-lg overflow-hidden border border-violet-500 hover:scale-[1.03] hover:shadow-[0_4px_15px_rgba(139,92,246,0.4)] transition-all duration-300 flex flex-col"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="aspect-video">
              <iframe
                src={project.youtube}
                title={project.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-violet-300">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 font-medium mt-auto"
              >
                <FiGithub className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .animate-slideLeftRight {
          animation: slideLeftRight 2s ease-in-out infinite;
        }
        @keyframes slideLeftRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
