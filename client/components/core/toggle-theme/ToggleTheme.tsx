'use client'
import useTheme from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant='outline'>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
}
