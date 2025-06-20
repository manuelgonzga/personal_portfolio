import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    title: " HIGHER TECHNICIAN IN NETWORK COMPUTER SYSTEMS ADMINISTRATION",
    date: "2019",
    description: (
      <ul className="list-disc pl-5 space-y-1 text-black-800">
        <li>Network administration, including network service implementation, router and switch configuration and management of LAN and WAN networks.</li>
        <li>Skills to install, configure, and manage databases.</li>
        <li>Install, configure, and manage operating systems.</li>
      </ul>
    ),
  },
  {
    title: "COMPANY INTERNSHIPS - SERVINFORM",
    date: "2021",
    description: (
      <ul className="list-disc pl-5 space-y-1 text-black-800">
        <li>Assisted in the configuration and management of servers, ensuring optimal performance and security of the systems.</li>
        <li>Performed testing and debugging of code, identifying and fixing bugs to improve the functionality and efficiency of the software.</li>
        <li>Developed automated scripts for recurring tasks, streamlining processes and improving overall operational efficiency.</li>
      </ul>
    ),
  },
  {
    title: "BACHELOR'S DEGREE IN COMPUTER ENGINEERING",
    date: "2021",
    description: (
      <ul className="list-disc pl-5 space-y-1 text-black-800">
        <li>Proficiency in several programming languages such as C, C++, Python, and Java.</li>
        <li>Web application programming handling both frontend and backend.</li>
        <li>Advanced techniques for parallel and concurrent systems programming.</li>
        <li>Detailed study of CPU architecture and design, memory, cache, pipelines, and multiprocessor systems.</li>
      </ul>
    ),
  },
  {
    title: "INTERNATIONAL MOBILITY PROGRAM ARGENTINA",
    date: "2025",
    description: (
      <ul className="list-disc pl-5 space-y-1 text-black-800">
        <li>Gained experience working with innovative tools and methodologies, expanding my knowledge of various technologies applied in computer engineering.</li>
        <li>Collaborated effectively in multicultural teams, enhancing my communication and problem-solving skills in a diverse setting.</li>
        <li>Participated in international collaborative projects, managing teamwork and adapting to different regulations and technical requirements.</li>
      </ul>
    ),
  },
  {
    title: "GOOGLE CYBERSECURITY CERTIFICATE",
    date: "2025",
    description: ( 
    <ul className="list-disc pl-5 space-y-1 text-black-800">
        <li> Identify and mitigate common cybersecurity threats, risks, and vulnerabilities.</li>
        <li> Use SIEM and IDS tools to monitor systems and respond to security incidents.</li>
        <li> Apply foundational knowledge of Python, Linux, and SQL in cybersecurity tasks.</li>
    </ul>
    ),
  },
];

const Experience = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const [itemsOffset, setItemsOffset] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const offsets = itemsRef.current.map((el) => {
      if (!el) return 0;
      return el.offsetTop + el.offsetHeight / 2;
    });

    setItemsOffset(offsets);
  }, [itemsRef.current.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      let lastVisibleIndex = -1;
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          lastVisibleIndex = index;
        }
      });

      if (lastVisibleIndex === -1) {
        setLineHeight(0);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const lastItemRect = itemsRef.current[lastVisibleIndex].getBoundingClientRect();

      const newHeight = lastItemRect.top + lastItemRect.height / 2 - containerRect.top;
      setLineHeight(newHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = (index) => {
    if (itemsOffset.length === 0) return false;
    return itemsOffset[index] <= lineHeight + 20;
  };

  return (
    <section id="experience" className="relative min-h-screen py-20 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-violet-400 mb-20 text-center">My Experience</h2>

      <div className="flex justify-end">
        <div ref={containerRef} className="relative w-full md:w-1/2 pl-8">
          {/* Línea vertical animada */}
          <motion.div
            className="absolute top-0 left-6 w-1 bg-gradient-to-b from-violet-500 via-violet-600 to-violet-700 rounded-full"
            style={{ height: lineHeight }}
            initial={{ height: 0 }}
            animate={{ height: lineHeight }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          />

          <ul className="space-y-16 relative z-10">
            {experiences.map((exp, index) => {
              const isLastTwo = index >= experiences.length - 2;

              return (
                <li
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="relative pl-14 cursor-pointer group flex items-start"
                  onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                >
                  {/* Nota animada a la izquierda en escritorio */}
                  <AnimatePresence>
                    {selectedIndex === index && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ type: "spring", stiffness: 90, damping: 20 }}
                          className="hidden md:block absolute right-full mr-8 max-w-xs bg-yellow-100 text-gray-800 p-5 rounded-lg shadow-lg border-r-4 border-yellow-400"
                          style={{
                            minHeight: "120px",
                            minWidth: "400px",
                            top: isLastTwo ? "auto" : 0,
                            bottom: isLastTwo ? 0 : "auto",
                          }}
                        >
                          {/* Flecha apuntando */}
                          <div
                            style={{
                              position: "absolute",
                              right: "-12px",
                              width: 0,
                              height: 0,
                              borderLeft: "12px solid #FBBF24",
                              borderTop: isLastTwo ? "10px solid transparent" : "none",
                              borderBottom: isLastTwo ? "none" : "10px solid transparent",
                              top: isLastTwo ? "auto" : "16px",
                              bottom: isLastTwo ? "16px" : "auto",
                            }}
                          />
                          <h4 className="font-semibold mb-2">{exp.title}</h4>
                          <div className="text-sm leading-relaxed">{exp.description}</div>
                        </motion.div>

                        {/* Modal en móvil */}
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 50 }}
                          transition={{ type: "spring", stiffness: 90, damping: 20 }}
                          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 md:hidden p-4"
                          onClick={() => setSelectedIndex(null)}
                        >
                          <motion.div
                            className="bg-yellow-100 text-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-400 max-w-sm w-full relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                          >
                            <button
                              onClick={() => setSelectedIndex(null)}
                              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                              aria-label="Close"
                            >
                              ✕
                            </button>
                            <h4 className="font-semibold mb-2">{exp.title}</h4>
                            <div className="text-sm leading-relaxed">{exp.description}</div>
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* Punto */}
                  <span
                    className={`absolute left-3 top-3 w-6 h-6 rounded-full border-4 border-white transition-transform ${
                      selectedIndex === index ? "bg-violet-500 scale-125" : "bg-gray-700"
                    }`}
                  />

                  {/* Título y fecha animados según línea */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isVisible(index) ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex flex-col"
                  >
                    <h3 className="font-semibold text-xl text-white">{exp.title}</h3>
                    <span className="text-sm text-gray-400">{exp.date}</span>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
