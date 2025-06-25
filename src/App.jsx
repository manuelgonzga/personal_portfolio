import ChatWidget from "./components/ChatWidget";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import Projects from './components/Projects';


export default function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <Projects />
      <Experience />
      <Footer />
      <ChatWidget />
    </>
  )
}