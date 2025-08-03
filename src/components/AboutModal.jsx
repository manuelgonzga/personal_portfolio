import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const AboutModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, duration: 0.8 }}
        className="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl p-6 flex flex-col md:flex-row gap-6"
      >
        {/* Image */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <img
            src="/fotomanu.jpg"
            alt="Manuel Gonzalez Gamito"
            className="rounded-2xl w-48 h-48 object-cover border-4 border-violet-500 shadow-md"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 text-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">About Me</h2>
            <button onClick={onClose}>
              <FiX className="w-6 h-6 text-gray-300 hover:text-red-400" />
            </button>
          </div>
          <p className="text-base leading-relaxed mb-4">
            Hi! I am Manuel and I am looking for a job in the technology sector to gain experience and apply the
            knowledge I have acquired along the way. My goal is to grow professionally, take
            on new challenges, and continue learning while contributing to technical
            problem-solving and process improvement in the field.
          </p>
          <ul className="mb-4 space-y-1">
            <li><strong>Email:</strong> manuelgonzga.2016@gmail.com</li>
            <li><strong>Phone:</strong> +34 656 66 86 16</li>
          </ul>

          {/* Download CV Button */}
          <a
            href="/ManuelGonzálezGamito_CV.pdf"
            download="ManuelGonzálezGamito_CV.pdf"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutModal;
