import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

// The particle engine is ~a third of the bundle and is pure decoration, so it
// is split out and streamed in after the page is interactive. Nothing about the
// effect changes — it just stops blocking first paint.
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
          <Suspense fallback={null}>
            <ParticlesBackground />
          </Suspense>
          
          {/* Ambient light — three soft accent washes, tuned per theme so light
              mode stays airy and dark mode keeps the canvas black-dominant */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="ambient-blob fixed w-[520px] h-[520px] bg-primary/[0.08] dark:bg-primary/[0.13] rounded-full blur-[130px] animate-pulse-glow"
              style={{ top: '5%', left: '15%' }}
            />
            <div
              className="ambient-blob fixed w-[420px] h-[420px] bg-secondary/[0.07] dark:bg-secondary/[0.10] rounded-full blur-[110px] animate-pulse-glow"
              style={{ bottom: '15%', right: '15%', animationDelay: '1s' }}
            />
            <div
              className="ambient-blob fixed w-[700px] h-[700px] bg-accent/[0.05] dark:bg-accent/[0.07] rounded-full blur-[160px] opacity-60"
              style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>

          {/* Fine grain so the large flat areas never look plasticky */}
          <div className="noise-overlay" aria-hidden />

          
          {/* Navigation */}
          <Navigation />
          
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
