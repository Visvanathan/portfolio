import { useEffect, useState } from 'react';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import FounderMark from './FounderMark';

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Work', href: '#work' },
  { label: 'Branzia', href: '#branzia' },
  { label: 'Experience', href: '#experience' },
];

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable: the choice lasts for this visit only */
    }
    setDark(next);
  };

  return { dark, toggle };
}

export default function Nav() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
            <span className="font-head font-semibold text-[0.98rem]">Visvanathan D</span>
            <span className="text-[0.78rem] text-hint">Founder, Branzia</span>
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden md:flex items-center gap-1 mr-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="px-3.5 py-2 rounded-full text-[0.95rem] font-medium text-body no-underline hover:text-ink hover:bg-cream transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggle}
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

      {open && (
        <div className="md:hidden border-t border-line">
          <ul className="wrap py-3 flex flex-col">
            {[...links, { label: 'Contact', href: '#contact' }].map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-head font-medium text-ink no-underline border-b border-line last:border-0">
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
