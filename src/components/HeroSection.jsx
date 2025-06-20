import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  return (
    <section className="h-screen bg-transparent flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
      
      {/* Left Section */}
      <div
        className="
          z-40 mt-0 xl:mt-18
          bg-black bg-opacity-10 backdrop-blur-md rounded-lg
          p-6
          xl:bg-transparent xl:backdrop-blur-0 xl:p-0
          transition-colors duration-500
        "
      >
        <motion.h1 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6"
        >
          Small Steps <br/> Big Dreams
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.5,
          }}
          className="text-xl md:text-1xl lg:text-2xl text-purple-200 max-w-2xl"
        >
          I'm on a journey to grow as a developer by learning, building, and improving with each step. I enjoy turning ideas into useful experiences and I’m always looking for the next challenge to push my skills further.
        </motion.p>
      </div>

      {/* Right Section */}
      <Spline 
        className="absolute xl:right-[-20%] right-7 bottom-[9%] lg:bottom-10"
        scene="https://prod.spline.design/mtWeBJsZNCIDutfJ/scene.splinecode" 
      />
       
    </section>
  );
}

export default HeroSection;
