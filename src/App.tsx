import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <motion.p
              className="text-muted-foreground font-display text-sm tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="relative min-h-screen bg-background overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Particle Background */}
          <ParticlesBackground />
          
          {/* Gradient Overlay - Fixed background elements that don't move on scroll */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div 
              className="fixed w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" 
              style={{ top: '5%', left: '15%' }}
            />
            <div 
              className="fixed w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow" 
              style={{ bottom: '15%', right: '15%', animationDelay: '1s' }}
            />
            <div 
              className="fixed w-[700px] h-[700px] bg-accent/5 rounded-full blur-[150px]" 
              style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>
          
          {/* Navigation */}
          <Navigation scrollY={scrollY} />
          
          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          
          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
