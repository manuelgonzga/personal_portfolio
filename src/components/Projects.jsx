import { useRef, useState, useEffect } from "react";
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
  const scrollRef = useRef(null);
  const [rebounding, setRebounding] = useState(false);
  const [dragging, setDragging] = useState(false);

  const bounceBack = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.style.transition = "transform 0.3s ease";
    el.style.transform = "translateX(0px)";

    setTimeout(() => {
      el.style.transition = "";
    }, 300);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 300;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    if (direction === "left" && el.scrollLeft === 0) {
      bounceEffect("left");
      return;
    }

    if (direction === "right" && el.scrollLeft >= maxScrollLeft - 1) {
      bounceEffect("right");
      return;
    }

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const bounceEffect = (direction) => {
    if (!scrollRef.current || rebounding) return;

    setRebounding(true);
    const el = scrollRef.current;

    const distance = 15;
    const sign = direction === "left" ? -1 : 1;

    el.style.transition = "transform 0.2s ease";
    el.style.transform = `translateX(${sign * distance}px)`;

    setTimeout(() => {
      bounceBack();
      setRebounding(false);
    }, 150);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScrollLeft = () => el.scrollWidth - el.clientWidth;

    const handleTouchMove = (e) => {
      if (!el) return;
      const leftEdge = el.scrollLeft === 0;
      const rightEdge = el.scrollLeft >= maxScrollLeft() - 1;
      const touch = e.touches[0];

      const maxDistance = 200; // máximo overscroll visual

      if (leftEdge) {
        // Cuánto se desplazó el dedo desde el borde izquierdo
        const overscroll = Math.min(maxDistance, touch.clientX * 0.3);
        el.style.transform = `translateX(${overscroll}px)`;
      } else if (rightEdge) {
        // Cuánto se desplazó el dedo desde el borde derecho (se invierte)
        const overscroll = Math.min(maxDistance, (window.innerWidth - touch.clientX) * 0.3);
        el.style.transform = `translateX(-${overscroll}px)`;
      }

      setDragging(true);
    };

    const handleTouchEnd = () => {
      if (dragging) {
        bounceBack();
        setDragging(false);
      }
    };

    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  return (
    <section id="projects" className="py-16 px-4 bg-transparent text-white relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-violet-400 mt-10">
        My Projects
      </h2>

      {/* Flechas solo en móvil */}
      <button
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="md:hidden absolute top-[55%] left-2 -translate-y-1/2 bg-violet-700 bg-opacity-60 hover:bg-opacity-90 text-white rounded-full p-2 z-20 shadow-lg"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        aria-label="Scroll right"
        onClick={() => scroll("right")}
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
        {projects.map((project) => (
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
