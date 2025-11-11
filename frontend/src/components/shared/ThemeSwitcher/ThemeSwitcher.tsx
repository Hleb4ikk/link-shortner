import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Button from '../Button/Button';
import styles from './ThemeSwitcher.module.css';

type Theme = 'light' | 'dark';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      applyTheme(saved);
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const systemTheme: Theme = prefersDark ? 'dark' : 'light';
      applyTheme(systemTheme);
      setTheme(systemTheme);
    }
  }, []);

  function applyTheme(newTheme: Theme) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  return (
    <Button onClick={toggleTheme} className={styles.themeSwitcher}>
      {theme === 'light' ? (
        <Sun className={styles.icon} />
      ) : (
        <Moon className={styles.icon} />
      )}
    </Button>
  );
}
