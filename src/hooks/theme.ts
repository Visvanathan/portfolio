import { useEffect, useState } from 'react';

// Light/dark theme, shared by the nav toggle and the command palette. index.html applies the saved
// or system theme before first paint; this only handles changes after that.
const EVENT = 'vd:theme';

export const isDark = () => document.documentElement.classList.contains('dark');

export function setDark(next: boolean) {
  document.documentElement.classList.toggle('dark', next);
  try {
    localStorage.setItem('theme', next ? 'dark' : 'light');
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
  window.dispatchEvent(new Event(EVENT));
}

export const toggleTheme = () => setDark(!isDark());

/** Current theme, kept in sync wherever it is changed from. */
export function useTheme() {
  const [dark, setState] = useState(isDark);
  useEffect(() => {
    const sync = () => setState(isDark());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return { dark, toggle: toggleTheme };
}
