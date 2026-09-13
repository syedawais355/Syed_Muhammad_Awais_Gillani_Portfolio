import { motion, useMotionValue, useTransform, animate, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Code2, Sparkles } from 'lucide-react';
import portrait from '../assets/portrait.webp';

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

  // Kept clear of the portrait column so nothing collides with the subject.
  const floatingIcons = [
    { Icon: Code2, delay: 0, x: '6%', y: '22%', size: 40 },
    { Icon: Sparkles, delay: 0.8, x: '46%', y: '80%', size: 32 },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-20"
    >
      {/* Floating Background Icons — fade in once, then CSS float */}
      {floatingIcons.map(({ Icon, delay, x, y, size }, index) => (
        <motion.div
          key={index}
          className="absolute hidden animate-float text-primary/25 dark:text-primary/20 pointer-events-none lg:block"
          style={{ left: x, top: y, animationDelay: `${delay}s`, animationDuration: `${5 + index}s` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1, duration: 0.5, ease: 'easeOut' }}
        >
          <Icon size={size} strokeWidth={1} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">

          {/* ---------------------------------------------------------- Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto w-full max-w-[260px] sm:max-w-[330px] lg:order-2 lg:max-w-[420px]"
          >
            {/* Accent bloom behind the subject */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[8%] aspect-square w-[94%] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 blur-[60px] sm:blur-[80px]"
            />

            {/* Hairline halo the shoulders break out of */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[11%] aspect-square w-[88%] -translate-x-1/2 rounded-full border border-hairline"
            />

            <div className="portrait-shadow relative z-10">
              <img
                src={portrait}
                alt="Syed Muhammad Awais Gillani"
                width={900}
                height={1237}
                fetchPriority="high"
                decoding="async"
                draggable={false}
                className="portrait-fade w-full select-none object-contain"
              />
            </div>
          </motion.div>

          {/* -------------------------------------------------------------- Copy */}
          <motion.div
            className="order-2 text-center lg:order-1 lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name */}
            <motion.h1
              variants={itemVariants as Variants}
              className="mb-4 font-display text-4xl font-bold sm:text-5xl lg:text-5xl xl:text-6xl"
            >
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text-animated">Syed Muhammad</span>
              <br />
              <span className="gradient-text">Awais Gillani</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVariants as Variants}
              className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl lg:mx-0"
            >
              AI &amp; Python Developer | Automation &amp; Web Scraping Enthusiast
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants as Variants}
              className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground/85 lg:mx-0"
            >
              Second-year BSCS student passionate about building intelligent automation systems,
              web scrapers, and AI-powered solutions that make a difference.
            </motion.p>

            {/* Stats - Live & Interactive */}
            <motion.div
              variants={itemVariants as Variants}
              className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 sm:gap-6 lg:mx-0"
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

        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const tilt = index % 2 === 0 ? 1 : -1;

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, delay: 0.5, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <motion.div
      ref={ref}
      className="group relative w-full hover:z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="surface surface-hover relative overflow-hidden rounded-2xl p-4 sm:p-5"
        style={{ rotate: `${tilt}deg` }}
        whileHover={{ y: -8, scale: 1.05, rotate: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {/* Gradient overlay — CSS transition, zero JS overhead */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/12 via-secondary/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Shine — CSS keyframe, no Framer Motion */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="shine-sweep absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="mb-1 flex items-center justify-center gap-0.5">
            <motion.span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text font-display text-2xl font-bold text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-secondary sm:text-3xl">
              {rounded}
            </motion.span>
            <span className="font-display text-xl font-bold text-primary sm:text-2xl">{suffix}</span>
          </div>
          <div className="text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground transition-colors duration-200 group-hover:text-foreground sm:text-xs">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
