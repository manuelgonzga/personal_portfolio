import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-6 md:px-20 border-t border-violet-500/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Nombre y frase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            Manuel González Gamito · Built with React, TailwindCSS & Vite
          </p>
        </motion.div>

        {/* Íconos de redes sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex space-x-6 text-xl"
        >
          <a
            href="https://github.com/manuelgonzga"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/manuglezg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            <FiLinkedin />
          </a>
          <a
            href="https://instagram.com/manuglezg_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            <FiInstagram />
          </a>
        </motion.div>

        {/* Contacto visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-gray-500 text-center md:text-right"
        >
          <p>manuelgonzga.2016@gmail.com</p>
          <p>+34 656 66 86 16</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
