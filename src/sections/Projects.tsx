import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  githubUrl?: string;
  liveUrl?: string;
  gradient: string;
  accentGradient: string;
  tilt?: number;
}

const projects: Project[] = [
  {
    title: 'YouTube Automation',
    description: 'Automates YouTube analytics using Google Apps Script. Handles multiple channels with OAuth 2.0 authentication and stores comprehensive analytics data in Google Sheets for easy analysis and reporting.',
    tech: ['Google Apps Script', 'YouTube API', 'OAuth 2.0', 'Google Sheets'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg',
    gradient: 'from-red-500/20 via-rose-500/10 to-pink-500/20',
    accentGradient: 'from-red-500 to-rose-600',
    tilt: -2,
  },
  {
    title: 'Organization Names Extractor',
    description: 'A FastAPI-powered web service that extracts company or organization names from website HTML content. Features intelligent data cleaning and outputs structured CSV files for further processing.',
    tech: ['FastAPI', 'Python', 'BeautifulSoup', 'Pandas', 'CSV Processing'],
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-blue-500/20',
    accentGradient: 'from-teal-500 to-cyan-600',
    tilt: 1,
  },
  {
    title: 'Centralized Jobs Scraper',
    description: 'A Django-based platform that collects job listings from multiple websites using custom scrapers. Stores daily data in organized Google Sheets tabs with automated scheduling and notifications.',
    tech: ['Django', 'Selenium', 'PostgreSQL', 'Google Sheets API', 'Cron Jobs'],
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
    accentGradient: 'from-blue-500 to-indigo-600',
    tilt: -1,
  },
  {
    title: 'MRO Automation & Monitoring',
    description: 'Comprehensive Django system managing multiple website scrapers for MRO (Maintenance, Repair, Operations) products. Automatically fixes price/availability issues, handles failed orders, and repairs automation flows.',
    tech: ['Django', 'Selenium Grid', 'Redis', 'Celery', 'Monitoring Dashboard'],
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    gradient: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/20',
    accentGradient: 'from-purple-500 to-violet-600',
    tilt: 2,
  },
  {
    title: 'Defendants Monitoring System',
    description: 'Google Apps Script solution that reads Google Sheet rows, scrapes public arrest/jail sources daily, updates defendant statuses, and sends email alerts when new data is found.',
    tech: ['Google Apps Script', 'Web Scraping', 'Email Automation', 'Google Sheets'],
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg',
    gradient: 'from-amber-500/20 via-orange-500/10 to-red-500/20',
    accentGradient: 'from-amber-500 to-orange-600',
    tilt: -1.5,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full flex flex-col p-8 rounded-3xl backdrop-blur-xl overflow-visible"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)
          `,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          rotate: `${project.tilt}deg`,
          willChange: 'transform, box-shadow',
        }}
        whileHover={{
          y: -16,
          scale: 1.03,
          rotate: 0,
          boxShadow: `
            0 24px 64px -12px rgba(139, 92, 246, 0.4),
            0 0 96px -20px rgba(6, 182, 212, 0.25),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)
          `,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-30 rounded-3xl"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)
            `
          }}
        />

        {/* Animated shine effect - Clipped */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.12) 50%, transparent 60%)',
            }}
            animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        {/* Frosted border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/25 transition-all duration-300 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon with neumorphic styling */}
          <motion.div
            className="relative w-18 h-18 mb-6 flex-shrink-0"
            animate={isHovered ? {
              scale: 1.12,
              rotate: [0, -6, 6, -6, 0]
            } : { scale: 1, rotate: 0 }}
            transition={{
              scale: { duration: 0.3, ease: 'easeOut' },
              rotate: { duration: 0.6, ease: 'easeInOut' }
            }}
          >
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.accentGradient} blur-xl`}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            />
            <div
              className="relative w-18 h-18 rounded-2xl p-4 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                boxShadow: `
                  0 8px 16px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img
                src={project.icon}
                alt={`${project.title} icon`}
                className="w-10 h-10 object-contain filter drop-shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Title with gradient on hover */}
          <h3 className="text-2xl font-display font-bold mb-4 leading-tight">
            <span className={`transition-all duration-300 ${isHovered ? `bg-gradient-to-r ${project.accentGradient} bg-clip-text text-transparent` : 'text-white'}`}>
              {project.title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack with staggered animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  boxShadow: '0 6px 16px rgba(139, 92, 246, 0.35)',
                }}
                transition={{
                  delay: index * 0.12 + techIndex * 0.04,
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-muted-foreground border border-white/10 group-hover:border-primary/30 group-hover:bg-white/10 group-hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Actions with gradient buttons */}
          <div className="flex items-center gap-3 mt-auto">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  willChange: 'transform'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Github size={16} />
                Code
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${project.accentGradient} transition-all duration-200`}
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  willChange: 'transform'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 12px 28px rgba(139, 92, 246, 0.45)'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
            )}

            <motion.button
              className="ml-auto p-2.5 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-all border border-white/10 hover:border-white/20"
              style={{ opacity: isHovered ? 1 : 0, willChange: 'transform, opacity' }}
              whileHover={{ scale: 1.12, x: 5, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Corner glow effect */}
        <motion.div
          className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${project.accentGradient} blur-[100px] pointer-events-none rounded-full`}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-secondary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-primary font-medium text-sm tracking-widest uppercase">
              Projects
            </span>
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-secondary via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
            Featured <span className="gradient-text-animated">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            A collection of my recent work showcasing automation systems,
            web scrapers, and intelligent solutions built with modern technologies.
          </p>
        </motion.div>

        {/* Projects Grid - Responsive 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
