'use client'
import { getFromStorage, setToStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Ensure this code runs only in the browser (client-side)
    if (typeof window !== 'undefined') {
      const savedTheme = getFromStorage('theme', 'local') as 'light' | 'dark' | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    if (typeof window !== 'undefined') {
      setToStorage('theme', newTheme)
    }
  };

  return { theme, toggleTheme };
}
