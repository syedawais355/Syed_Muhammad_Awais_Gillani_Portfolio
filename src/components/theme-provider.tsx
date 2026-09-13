import { useEffect, type ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

/**
 * Keeps the browser chrome (address bar / task switcher tint) in step with the
 * active theme. The values match --background in index.css.
 */
const BROWSER_CHROME = {
  light: '#f7f4ed',
  dark: '#090909',
} as const;

const ThemeColorSync = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = BROWSER_CHROME[resolvedTheme === 'dark' ? 'dark' : 'light'];

    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"], meta[name="msapplication-TileColor"]')
      .forEach((meta) => meta.setAttribute('content', color));
  }, [resolvedTheme]);

  return null;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    storageKey="theme"
  >
    <ThemeColorSync />
    {children}
  </NextThemesProvider>
);
