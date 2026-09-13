import { useEffect, useMemo, memo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from 'next-themes';

/** Brand-family particles only — warm amber / copper, never blue. */
const PALETTE = {
  dark: {
    particles: ['#fbbf24', '#f59e0b', '#fb923c'],
    link: '#f59e0b',
    linkOpacity: 0.22,
    opacity: { min: 0.25, max: 0.6 },
  },
  light: {
    particles: ['#b45309', '#c2410c', '#a16207'],
    link: '#b45309',
    linkOpacity: 0.12,
    opacity: { min: 0.10, max: 0.26 },
  },
} as const;

const ParticlesBackground = memo(() => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: 'window' as const,
        events: {
          onClick: {
            enable: true,
            mode: 'push' as const,
          },
          onHover: {
            enable: true,
            mode: 'grab' as const,
            parallax: {
              enable: false,
              force: 60,
              smooth: 10,
            },
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 200,
            links: {
              blink: false,
              consent: false,
              opacity: isDark ? 0.8 : 0.45,
            },
          },
          repulse: {
            distance: 150,
            duration: 0.4,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: [...palette.particles],
        },
        links: {
          color: {
            value: palette.link,
          },
          distance: 180,
          enable: true,
          frequency: 1,
          opacity: palette.linkOpacity,
          width: 1,
          triangles: {
            enable: false,
            frequency: 0.05,
            opacity: 0.08,
          },
        },
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            enable: false,
            distance: 200,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'out' as const,
            bottom: 'out' as const,
            left: 'out' as const,
            right: 'out' as const,
            top: 'out' as const,
          },
          random: false,
          speed: 0.8,
          straight: false,
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            area: 900,
          },
          value: 60,
        },
        opacity: {
          value: {
            min: palette.opacity.min,
            max: palette.opacity.max,
          },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: palette.opacity.min,
            sync: false,
            destroy: 'none' as const,
            startValue: 'random' as const,
          },
        },
        shape: {
          type: 'circle' as const,
        },
        size: {
          value: {
            min: 2,
            max: 4,
          },
          animation: {
            enable: false,
            speed: 2,
            minimumValue: 1.5,
            sync: false,
            destroy: 'none' as const,
            startValue: 'random' as const,
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          random: false,
          direction: 'clockwise' as const,
          animation: {
            enable: false,
            speed: 0,
            sync: false,
          },
        },
        shadow: {
          blur: 8,
          color: {
            value: palette.link,
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        collisions: {
          enable: false,
        },
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
      },
      detectRetina: false,
      smooth: false,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: 25,
              },
              links: {
                distance: 120,
              },
            },
            interactivity: {
              modes: {
                grab: {
                  distance: 150,
                },
                bubble: {
                  distance: 180,
                },
              },
            },
          },
        },
      ],
      style: {
        position: 'fixed',
      },
    }),
    [isDark, palette]
  );

  // Remount on theme change so tsparticles re-reads the palette.
  return (
    <Particles id="tsparticles" key={isDark ? 'dark' : 'light'} options={options} />
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default ParticlesBackground;
