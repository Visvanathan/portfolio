import { useEffect, useRef, useState } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import FounderMark from './FounderMark';
import { isMac, openPalette } from '../hooks/palette';
import { centreOf, useTheme } from '../hooks/theme';

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Now', href: '#now' },
];

export default function Nav() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mac] = useState(isMac);
  const [current, setCurrent] = useState('');
  const progress = useRef<HTMLDivElement>(null);

  // Header background once scrolled, plus the reading-progress line (set directly, no re-render per frame).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Highlight the nav link for the section being read: whichever section crosses a band near the top of
  // the screen. Every section is watched, so sections without a nav link clear the highlight.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled || open ? 'bg-paper/85 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="wrap flex items-center justify-between h-[72px]" aria-label="Main">
        <a href="#top" className="flex items-center gap-3 no-underline text-ink" onClick={() => setOpen(false)}>
          <FounderMark className="size-9 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="font-head font-medium text-[1.05rem]">Visvanathan D</span>
            <span className="font-mono text-[0.72rem] text-hint">developer · founder</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden md:flex items-center gap-1 mr-2">
            {links.map((l) => {
              const here = current === l.href.slice(1);
              return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={here ? 'location' : undefined}
                  className={`relative px-3.5 py-2 rounded-lg text-[0.95rem] font-medium no-underline hover:text-ink hover:bg-cream transition-colors after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand after:transition-transform after:duration-300 after:origin-left ${
                    here ? 'text-ink after:scale-x-100' : 'text-body after:scale-x-0'
                  }`}
                >
                  {l.label}
                </a>
              </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 mr-1 rounded-lg border border-line text-hint hover:text-ink hover:border-line-strong font-mono text-[0.74rem] cursor-pointer transition-colors"
          >
            <kbd className="font-mono">{mac ? '⌘' : 'Ctrl'}</kbd>
            <kbd className="font-mono">K</kbd>
          </button>
          <button
            type="button"
            onClick={(e) => toggle(centreOf(e.currentTarget))}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-cream transition-colors cursor-pointer"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <a href="#contact" className="btn btn-primary !min-h-10.5 !px-5 text-[0.93rem] hidden sm:inline-flex">
            Get in touch
          </a>
          <button
            type="button"
            className="md:hidden grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-cream cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Reading progress: a hairline along the bottom of the header. */}
      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-0.5 bg-brand origin-left scale-x-(--progress) motion-reduce:hidden"
        style={{ ['--progress' as string]: 0 }}
      />

      {open && (
        <div className="md:hidden border-t border-line">
          <ul className="wrap py-3 flex flex-col">
            {[...links, { label: 'Contact', href: '#contact' }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-head text-ink no-underline border-b border-line last:border-0">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
