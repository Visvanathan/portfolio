import { useEffect } from 'react';

/**
 * Fades `.reveal` elements in as they scroll into view. Content is only hidden once
 * this runs (it adds `js-reveal` to <html>), and a timer reveals anything still hidden,
 * so a failed observer can never leave a section blank.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const showAll = () => els.forEach((el) => el.classList.add('in'));

    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll();
      return;
    }

    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(showAll, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
