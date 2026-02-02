import { useEffect, useMemo, memo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground = memo(() => {
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
      fpsLimit: 120,
      interactivity: {
        detectsOn: 'window' as const,
        events: {
          onClick: {
            enable: true,
            mode: ['push', 'bubble'] as any,
          },
          onHover: {
            enable: true,
            mode: ['grab', 'bubble'] as any,
            parallax: {
              enable: true,
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
              blink: true,
              consent: false,
              opacity: 0.8,
            },
          },
          bubble: {
            distance: 250,
            size: 8,
            duration: 2,
            opacity: 0.8,
            speed: 3,
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
          value: [
            '#8b5cf6',  // Purple
            '#06b6d4',  // Cyan
            '#ec4899',  // Pink
            '#a78bfa',  // Light purple
            '#3b82f6',  // Blue
            '#10b981',  // Green
            '#f59e0b',  // Amber
          ],
        },
        links: {
          color: {
            value: '#8b5cf6',
          },
          distance: 180,
          enable: true,
          frequency: 1,
          opacity: 0.35,
          width: 1.5,
          triangles: {
            enable: true,
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
          value: 120,
        },
        opacity: {
          value: {
            min: 0.3,
            max: 0.7,
          },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.2,
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
            max: 6,
          },
          animation: {
            enable: true,
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
            value: '#8b5cf6',
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
      detectRetina: true,
      smooth: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: false,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: 40,
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
    []
  );

  return (
    <Particles id="tsparticles" options={options} />
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default ParticlesBackground;
