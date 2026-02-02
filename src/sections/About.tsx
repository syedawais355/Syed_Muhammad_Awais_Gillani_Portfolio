import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Elements - Removed to use global App background */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid place-items-center text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-secondary" />
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                About Me
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-secondary via-primary to-transparent" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-10 leading-tight"
            >
              Architecting <span className="gradient-text">Intelligent</span>
              <br />
              Ecosystems
            </motion.h2>

            {/* Bio - Encapsulated in Tech Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-primary/20 transition-colors duration-500"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto relative z-10">
                <p>
                  As a specialized <span className="text-white font-medium">Software Engineer</span>, I engineer scalable automation infrastructures and high-performance web solutions. My expertise lies in orchestrating complex data pipelines and building robust applications that drive operational efficiency.
                </p>
                <p>
                  I leverage advanced frameworks like <span className="text-white font-medium">FastAPI</span> and <span className="text-white font-medium">Django</span> to develop secure, backend-heavy systems, while utilizing state-of-the-art scraping technologies to harvest and process data at scale.
                </p>
                <p>
                  My approach is rooted in precision engineering—delivering clean, maintainable code that solves critical business problems. From <span className="text-white font-medium">cloud-native architectures</span> to seamless API integrations, I build meaningful technology that empowers growth.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
