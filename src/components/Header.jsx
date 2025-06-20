import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import AboutModal from './AboutModal';
import { useForm, ValidationError } from '@formspree/react';



const Header = () => {
  // Toggle the Menu open/close

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // State to track if the contact form is open
  const [ contactFormOpen, setContactFormOPen ] = useState(false);
  const [ aboutOpen, setAboutOpen ] = useState(false);

  const openContactForm = () => setContactFormOPen(true)
  const closeContactForm = () => setContactFormOPen(false)

  const openAbout = () => setAboutOpen(true)
  const closeAbout = () => setAboutOpen(false)

  //Scroll


  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30); // activa al hacer scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formState, handleFormSubmit] = useForm("mwpbnpba"); //reemplaza


  return (

      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "header-transparent" : ""
      }`}
      >

        <div className="container mx-auto px-4 sm:px-6 lg:px8 flex items-center justify-between h-16 md:h-20">

            {/* Logo/Name */}
            <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
              duration: 1.2,
            }}
            className="flex items-center">

                <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">

                  Manuel González Gamito

                </span>

            </motion.div>  


            {/* Desktop Navigation */}
            <nav className="lg:flex hidden space-x-8 ml-[-60px]">
              {["Home", "About", "Projects", "Experience", "Contact"].map((item, index) => {
                const isAbout = item === "About";
                const isHome = item == "Home";
                const isContact = item == "Contact";
                const hrefMap = {
                  Home: "#",
                  About: "#",
                  Projects: "#projects",
                  Experience: "#experience",
                  Contact: "#contact",
                };

                return (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.7 + index * 0.2,
                    }}
                    className="relative text-gray-200 hover:text-violet-400 font-medium transition-colors duration-300 group"
                    {...(isAbout
                      ? { onClick: openAbout, role: "button", tabIndex: 0 }
                      : isHome
                      ? {
                        href: "#",
                        onClick: (e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth"});
                        },
                      }
                      :isContact
                      ? {
                        href: "#",
                        onClick: (e) => {
                          e.preventDefault();
                          openContactForm();
                        },
                      }
                      : { href: hrefMap[item] })}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                );
              })}
            </nav>



            {/* Social icons - Desktop */}
            <div className="md:flex hidden items-center space-x-4">

                      <motion.a 
              href="https://github.com/manuelgonzga" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-300 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                <FiGithub className="w-5 h-5"/>
              </motion.a>

                      <motion.a 
              href="https://www.linkedin.com/in/manuglezg/" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-300 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                <FiLinkedin className="w-5 h-5"/>
              </motion.a>

              <motion.a 
              href="https://www.instagram.com/manuglezg_/" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-300 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300">
                <FiInstagram className="w-5 h-5"/>
              </motion.a>
              
             
            </div>

            
            {/* Mobile Menu Button */}

            <div className="md:hidden flex items-center">

              <motion.button 
              whileTap={{ scale: 0.7 }}
              onClick={toggleMenu}
              className="text-gray-300">

                { isOpen ? <FiX className="h-6 w-6"/> : <FiMenu className="h-6 w-6"/>}

              </motion.button>

            </div>
            
        </div> 

        { /*Mobile Menu */}

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.5 }}
          className="md:hidden overflow-hidden bg-gray-900 dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5"
        >
          <nav className="flex flex-col space-y-3">
            {["Home", "About", "Projects", "Experience", "Contact"].map((item) => {
              const scrollToSection = (id) => {
                const section = document.querySelector(id);
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              };

              return (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 font-medium py-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMenu(); 

                    if (item === "Home") {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 300);
                    } else if (item === "About") {
                      setTimeout(() => {
                        setAboutOpen(true);
                      }, 300);
                    } else if (item == "Contact") {
                      setTimeout(() => {
                        openContactForm();
                      }, 300);                     
                    } else {
                      const hrefMap = {
                        Projects: "#projects",
                        Experience: "#experience",
                      };
                      const targetId = hrefMap[item];
                      if(targetId) {
                        setTimeout(() => {
                          const section = document.querySelector(targetId);
                          if(section){
                            section.scrollIntoView({ behavior: "smooth"});
                          }
                        }, 300);
                      }
                    }
                  }}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
             <div className="flex space-x-5">
              <a href="https://github.com/manuelgonzga" target="_blank" rel="noopener noreferrer">
                <FiGithub className="h-5 w-5 text-gray-300" />
              </a>
              <a href="https://www.linkedin.com/in/manuglezg/" target="_blank" rel="noopener noreferrer">
                <FiLinkedin className="h-5 w-5 text-gray-300"/>
              </a>
              <a href="https://www.instagram.com/manuglezg_/" target="_blank" rel="noopener noreferrer">
                <FiInstagram className="h-5 w-5 text-gray-300"/>
              </a>
             </div>

          </div>
        </motion.div>

        {/* Contact Form */}
        <AnimatePresence>
          {contactFormOpen && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30}}
                animate={{ scale: 1, opacity: 1, y: 0}}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 200,
                  duration: 0.8
                }}
                className="bg-gray-800 dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
              > 
                <div className="flex justify-between items-center mb-4"> 
                  <h1 className="text-2xl font-bold text-gray-300">
                    Get In Touch
                  </h1>

                  <button onClick={closeContactForm}>
                    <FiX className="w-5 h-5 text-gray-300 font-extrabold hover:text-red-400"/>
                  </button>
                </div>

                {/* Input Forms */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formState.succeeded && (
                    <p className="text-green-400 text-center font-medium mb-4">
                      Message sent successfully! 🚀
                    </p>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"                  
                    />
                    <ValidationError prefix="Name" field="name" errors={formState.errors} />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"                  
                    />
                    <ValidationError prefix="Email" field="email" errors={formState.errors} />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      id="message"
                      name="message"
                      placeholder="How can I help you?"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"                  
                    />
                    <ValidationError prefix="Message" field="message" errors={formState.errors} />
                  </div>

                  <motion.button 
                    type="submit"
                    disabled={formState.submitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50">
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* About Modal */}
        <AnimatePresence>
    
          {aboutOpen && (
            <AboutModal isOpen={aboutOpen} onClose={closeAbout} />
          )}
      
        </AnimatePresence>

      </header> 
  
  )
}

export default Header