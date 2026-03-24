import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('rk-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const isDark = theme === 'dark';

  const applyTheme = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.style.backgroundImage = "url('/bg.jpeg')";
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundImage = "url('/bg.png')";
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('rk-theme', theme);
  }, [theme, applyTheme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
