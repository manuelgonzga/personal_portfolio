import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiChevronRight, FiChevronLeft, FiDownload } from "react-icons/fi";

const projects = [
  {
    title: "Nestly - Finance App",
    description:
      "Full-stack mobile app for managing personal finances, developed with React Native, Node.js, and PostgreSQL. It supports tracking of income, expenses, and savings through a clean interface and real-time state updates.",
    playStore: "https://play.google.com/store/apps/details?id=com.manuglezg.nestly&hl=es", // Reemplaza con la URL real de tu app
    youtube: "https://www.youtube.com/embed/jdgqn2pPxP4",
  },
  {
    title: "Parlot - Language Platform",
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
    title: "Custom AI Chatbot",
    description:
      "This AI chatbot utilizes natural language processing and a deep learning model built with Python, Keras, and Flask. It processes user input to predict intent and generate context-aware responses through a RESTful API.",
    github: "https://github.com/manuelgonzga/chatbot_backend",
    youtube: "https://www.youtube.com/embed/0NwB_ot78Qk",
  },
  {
    title: "Emprecicla",
    description:
      "Emprecicla is an Angular-based web app (TypeScript, HTML, CSS) that connects users and businesses to promote recycling and sustainable material management.",
    github: "https://github.com/manuelgonzga/emprecicla-main",
    youtube: "https://www.youtube.com/embed/2mmgG0lWt1E",
  },
];

// Hook para detectar si estamos en desktop
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

const Projects = () => {
  const scrollRef = useRef(null);
  const isDesktop = useIsDesktop();

  // ... (aquí pondrías tu código de scroll y rebote si querés mantenerlo)

  return (
    <section id="projects" className="py-16 px-4 bg-transparent text-white relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-violet-400 mt-10">
        My Projects
      </h2>

      {/* Flechas solo en móvil */}
      <button
        aria-label="Scroll left"
        onClick={() => {
          if(scrollRef.current){
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
          }
        }}
        className="md:hidden absolute top-[55%] left-2 -translate-y-1/2 bg-violet-700 bg-opacity-60 hover:bg-opacity-90 text-white rounded-full p-2 z-20 shadow-lg"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        aria-label="Scroll right"
        onClick={() => {
          if(scrollRef.current){
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }
        }}
        className="md:hidden absolute top-[55%] right-2 -translate-y-1/2 bg-violet-700 bg-opacity-60 hover:bg-opacity-90 text-white rounded-full p-2 z-20 shadow-lg"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <FiChevronRight size={24} />
      </button>

      <div
        ref={scrollRef}
        className={`flex overflow-x-auto space-x-6 px-4
          scroll-snap-x mandatory
          md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-10 md:space-x-0 md:px-0
          max-w-6xl mx-auto
        `}
        style={{ overflowY: "hidden", WebkitOverflowScrolling: "touch" }}
      >
        {projects.map((project, index) => {
          if (!isDesktop) {
            // Sin animación en móvil, solo mostrar
            return (
              <div
                key={project.title}
                className="bg-gray-800 min-w-[280px] min-h-[440px] rounded-2xl shadow-lg overflow-hidden border border-violet-500 transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(139,92,246,0.4)] flex flex-col"
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
                  {project.playStore ? (
                    <a
                      href={project.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 font-medium mt-auto"
                    >
                      <FiDownload className="w-5 h-5" />
                      <span>View on Google Play</span>
                    </a>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 font-medium mt-auto"
                    >
                      <FiGithub className="w-5 h-5" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            );
          }

          // Animación solo desktop
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeInOut" }}
              className="bg-gray-800 min-w-[280px] min-h-[440px] rounded-2xl shadow-lg overflow-hidden border border-violet-500 transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(139,92,246,0.4)] flex flex-col"
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
                {project.playStore ? (
                  <a
                    href={project.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 font-medium mt-auto"
                  >
                    <FiDownload className="w-5 h-5" />
                    <span>View on Google Play</span>
                  </a>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 font-medium mt-auto"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
