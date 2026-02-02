import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Reusable Tech Badge Component
const TechBadge = ({ name, icon, delay, isInView, showLabel = true, index }: { name: string; icon: string; delay: number; isInView: boolean; showLabel?: boolean; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tilt = index % 2 === 0 ? 0.6 : -0.6; // Subtle alternating tilt for initial state

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, type: 'spring' }}
      className="group relative h-full w-full aspect-[1/1.1]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        zIndex: isHovered ? 20 : 1,
      }}
    >
      <motion.div
        className="relative h-full flex flex-col items-center justify-center gap-3 p-4 rounded-2xl backdrop-blur-md overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.1),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)
          `,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          rotate: `${tilt}deg`,
          willChange: 'transform, box-shadow',
        }}
        whileHover={{
          y: -6,
          scale: 1.04,
          rotate: 0,
          boxShadow: `
            0 20px 40px -12px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)
          `,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 15,
        }}
      >
        {/* Animated gradient background - subtle purple/blue for all */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-20 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)`
          }}
        />

        {/* Animated shine effect - Clipped */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.15) 50%, transparent 60%)',
            }}
            animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        {/* Frosted border */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition-all duration-300 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center"
            animate={isHovered ? {
              scale: 1.15,
              rotate: [0, -2, 2, -2, 0] // Gentle shake
            } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <img src={icon} alt={name} className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300" />
          </motion.div>

          {showLabel && (
            <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors text-center">
              {name}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const techStack = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
    { name: 'DRF', icon: 'https://hexmos.com/freedevtools/svg_icons/djangorest/djangorest-original.svg' }, // Django Rest Framework
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'Requests', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' }, // Generic Python for Requests lib or find better if available
    { name: 'Apps Script', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg' },
    { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg' },
    { name: 'Playwright', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg' },
    { name: 'Botasaurus', icon: 'https://raw.githubusercontent.com/omkarcloud/botasaurus/master/images/mascot.png' }, // Official-ish repo asset 
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  ];

  const tools = [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    { name: 'PyCharm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Windows', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg' },
    { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg' },
    { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg' },
    { name: 'Replit', icon: 'https://logo.svgcdn.com/logos/replit-icon.svg' },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements - Removed to use global App background */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-secondary" />
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Expertise
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-secondary via-primary to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A curated stack of powerful technologies engineered for building scalable, high-performance solutions.
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-2xl font-display font-bold text-white mb-10 flex items-center gap-3"
          >
            <div className="w-2 h-8 bg-primary rounded-full" />
            Core Technologies
          </motion.h3>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 items-stretch">
            {techStack.map((tech, i) => (
              <TechBadge key={tech.name} {...tech} delay={i * 0.05} isInView={isInView} index={i} />
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl font-display font-bold text-white mb-10 flex items-center gap-3"
          >
            <div className="w-2 h-8 bg-secondary rounded-full" />
            Development & Operations
          </motion.h3>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 items-stretch">
            {tools.map((tool, i) => (
              <TechBadge key={tool.name} {...tool} delay={0.3 + i * 0.05} isInView={isInView} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
