import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Reusable Tech Badge Component
interface TechBadgeProps {
  name: string;
  icon: string;
  delay: number;
  isInView: boolean;
  showLabel?: boolean;
  index: number;
}

const TechBadge = ({ name, icon, delay, isInView, showLabel = true, index }: TechBadgeProps) => {
  const tilt = index % 2 === 0 ? 0.6 : -0.6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      className="group relative h-full w-full aspect-[1/1.1] hover:z-20"
    >
      <motion.div
        className="surface surface-hover relative h-full flex flex-col items-center justify-center gap-3 p-4 rounded-2xl overflow-hidden"
        style={{ rotate: `${tilt}deg` }}
        whileHover={{ y: -6, scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Gradient overlay — CSS only */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-secondary/6 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Shine — CSS keyframe only */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="shine-sweep absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <img src={icon} alt={name} loading="lazy" decoding="async" className="w-full h-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_16px_hsl(var(--primary)/0.55)]" />
          </motion.div>

          {showLabel && (
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-center">
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
    // devicon only ships the wide "django REST framework" wordmark, which is
    // illegible at badge size. This is DRF's own square brand mark.
    { name: 'DRF', icon: 'https://www.django-rest-framework.org/img/logo.png' },
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
    { name: 'Replit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg' },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-secondary" />
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Expertise
            </span>
            <div className="w-12 h-0.5 rounded-full bg-gradient-to-r from-secondary via-primary to-transparent" />
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
            className="text-2xl font-display font-bold text-foreground mb-10 flex items-center gap-3"
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
            className="text-2xl font-display font-bold text-foreground mb-10 flex items-center gap-3"
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
