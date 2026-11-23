import { useEffect } from 'react';

/**
 * Keeps the address bar clean: in-page links (href="#work") scroll to their section without
 * adding "#work" to the URL. If the page is opened with a hash (for example "/#work" from the
 * 404 page or an old shared link), it scrolls there once and then removes the hash.
 */
export function useCleanAnchors() {
  useEffect(() => {
    const behavior = (): ScrollBehavior => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

    const goTo = (id: string, smooth: boolean) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: smooth ? behavior() : 'auto' });
      // Move keyboard focus with the scroll, so Tab continues from the section (and the skip link works).
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = (e.target as Element | null)?.closest('a')?.getAttribute('href');
      if (!href?.startsWith('#') || href.length < 2) return;
      if (goTo(href.slice(1), true)) e.preventDefault();
    };

    document.addEventListener('click', onClick);

    // Arrived with a hash: the browser tried to jump before React rendered, so do it now.
    if (location.hash.length > 1) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => {
        goTo(id, false);
        history.replaceState(history.state, '', location.pathname + location.search);
      });
    }

    return () => document.removeEventListener('click', onClick);
  }, []);
}
