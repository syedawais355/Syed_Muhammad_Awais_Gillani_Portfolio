import { useCallback, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

/** How long index.css cross-fades themed properties for. Keep the two in sync. */
const CROSSFADE_MS = 320;

interface ThemeToggleProps {
  className?: string;
}

/**
 * Icon-button theme switch. The two icons are stacked and swapped purely with
 * CSS transforms keyed off the `.dark` class, so the correct icon is painted on
 * the very first frame — no mount flicker, no layout shift.
 */
const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  // next-themes reports `undefined` until it mounts. The inline bootstrap in
  // index.html has already stamped the class, so read that once as the
  // starting value rather than flashing the wrong label.
  const [initialIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  );
  const isDark = resolvedTheme ? resolvedTheme === 'dark' : initialIsDark;

  const toggle = useCallback(() => {
    const root = document.documentElement;

    // Opt in to the cross-fade only for this switch, then clean up.
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), CROSSFADE_MS);

    setTheme(root.classList.contains('dark') ? 'light' : 'dark');
  }, [setTheme]);

  const label = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-hairline bg-tint text-muted-foreground transition-colors duration-300 hover:border-hairline-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* Accent wash that blooms in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <Sun
        aria-hidden
        size={17}
        strokeWidth={2}
        className="absolute rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden
        size={17}
        strokeWidth={2}
        className="absolute rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100"
      />
    </button>
  );
};

export default ThemeToggle;
