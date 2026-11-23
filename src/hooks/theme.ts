import { useEffect, useState } from 'react';

// Light/dark theme, shared by the nav toggle and the command palette. index.html applies the saved
// or system theme before first paint; this only handles changes after that.
const EVENT = 'vd:theme';

export const isDark = () => document.documentElement.classList.contains('dark');

function apply(next: boolean, save: boolean) {
  document.documentElement.classList.toggle('dark', next);
  if (save) {
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable: the choice lasts for this visit only */
    }
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Switches theme. Given a point (the toggle button's centre), the new theme spreads out from it
 * in a circle, using the View Transitions API where the browser has it. Otherwise it just switches.
 */
export function setDark(next: boolean, from?: { x: number; y: number }) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) return apply(next, true);

  const root = document.documentElement;
  root.classList.add('theme-switching');
  const t = document.startViewTransition(() => apply(next, true));
  t.finished.finally(() => root.classList.remove('theme-switching'));
  if (!from) return;

  const r = Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y));
  t.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${from.x}px ${from.y}px)`, `circle(${r}px at ${from.x}px ${from.y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
    .catch(() => undefined);
}

export const toggleTheme = (from?: { x: number; y: number }) => setDark(!isDark(), from);

/** Centre of an element, for starting the theme reveal from a button. */
export const centreOf = (el: Element) => {
  const b = el.getBoundingClientRect();
  return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
};

/** Current theme, kept in sync wherever it is changed from. Follows the system setting until the visitor picks one. */
export function useTheme() {
  const [dark, setState] = useState(isDark);
  useEffect(() => {
    const sync = () => setState(isDark());
    const media = matchMedia('(prefers-color-scheme: dark)');
    const onSystem = (e: MediaQueryListEvent) => {
      let saved = null;
      try {
        saved = localStorage.getItem('theme');
      } catch {
        /* no storage: treat as no saved choice */
      }
      if (!saved) apply(e.matches, false);
    };
    window.addEventListener(EVENT, sync);
    media.addEventListener('change', onSystem);
    return () => {
      window.removeEventListener(EVENT, sync);
      media.removeEventListener('change', onSystem);
    };
  }, []);
  return { dark, toggle: toggleTheme };
}
