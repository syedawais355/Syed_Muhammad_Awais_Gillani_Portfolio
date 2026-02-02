import { motion, useMotionValue, useTransform, animate, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code2, Sparkles } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatingIcons = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Sparkles, delay: 0.5, x: '85%', y: '15%' },
    { Icon: Code2, delay: 1, x: '80%', y: '70%' },
    { Icon: Sparkles, delay: 1.5, x: '15%', y: '75%' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Floating Background Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20 pointer-events-none hidden lg:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { delay: delay + 1, duration: 0.5 },
            scale: { delay: delay + 1, duration: 0.5 },
            y: {
              delay: delay + 1.5,
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <Icon size={40 + index * 10} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants as Variants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text-animated">Syed Muhammad</span>
          <br />
          <span className="gradient-text">Awais Gillani</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants as Variants}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          AI & Python Developer | Automation & Web Scraping Enthusiast
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants as Variants}
          className="text-base text-muted-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Second-year BSCS student passionate about building intelligent automation systems,
          web scrapers, and AI-powered solutions that make a difference.
        </motion.p>

        {/* Stats - Live & Interactive */}
        <motion.div
          variants={itemVariants as Variants}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto px-4"
        >
          {[
            { value: 5, suffix: '+', label: 'Projects' },
            { value: 2, suffix: '+', label: 'Years Experience' },
            { value: 10, suffix: '+', label: 'Technologies' },
          ].map((stat, index) => (
            <StatItem key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const StatItem = ({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isHovered, setIsHovered] = useState(false);
  const tilt = index % 2 === 0 ? 1 : -1; // Subtle alternating tilt

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        delay: 0.5,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [isInView, value, index, count]);

  return (
    <motion.div
      ref={ref}
      className="relative group w-full"
      style={{
        zIndex: isHovered ? 20 : 1,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative z-10 p-6 rounded-2xl backdrop-blur-md overflow-hidden"
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
          y: -8,
          scale: 1.05,
          rotate: 0,
          boxShadow: `
            0 20px 40px -12px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)
          `,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {/* Animated gradient background - subtle */}
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

        {/* Animated shine effect */}
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
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <motion.span className="text-3xl sm:text-4xl font-display font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
              {rounded}
            </motion.span>
            <span className="text-2xl sm:text-3xl font-display font-bold text-primary">{suffix}</span>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide group-hover:text-white transition-colors text-center uppercase">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
