import { useEffect, useMemo, useRef, useState, type ComponentType, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { FiArrowUpRight, FiCopy, FiCornerDownLeft, FiHash, FiMoon, FiSearch } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import profile from '../data/profile.json';
import { scrollToSection } from '../hooks/useCleanAnchors';
import { isDark, toggleTheme } from '../hooks/theme';
import { isMac, PALETTE_EVENT } from '../hooks/palette';

// Ctrl+K / ⌘K command palette: jump to a section, switch theme, copy the email, open profiles.
// Anything can open it with openPalette() from hooks/palette (the nav's ⌘K button does).

type Command = { id: string; group: string; label: string; icon: ComponentType<{ size?: number }>; run: () => void | string; keywords?: string };

const sections: [string, string][] = [
  ['story', 'Story'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['how-i-work', 'How I work'],
  ['toolkit', 'Toolkit'],
  ['filament', 'FilamentPHP'],
  ['now', 'Now'],
  ['contact', 'Contact'],
];

const link = (url: string) => () => void window.open(url, '_blank', 'noopener');

function useCommands(): Command[] {
  return useMemo(() => {
    const social = Object.fromEntries(profile.social.map((s) => [s.icon, s.url]));
    return [
      ...sections.map(([id, label]) => ({ id: `go-${id}`, group: 'Go to', label, icon: FiHash, run: () => void scrollToSection(id) })),
      { id: 'theme', group: 'Actions', label: 'Toggle dark mode', icon: FiMoon, keywords: 'theme light dark', run: () => void toggleTheme({ x: innerWidth / 2, y: innerHeight * 0.2 }) },
      {
        id: 'copy-email',
        group: 'Actions',
        label: `Copy email · ${profile.email}`,
        icon: FiCopy,
        keywords: 'mail contact',
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => undefined);
          return 'Email copied';
        },
      },
      { id: 'linkedin', group: 'Links', label: 'Open LinkedIn', icon: FaLinkedinIn, run: link(social.linkedin) },
      { id: 'github', group: 'Links', label: 'Open GitHub', icon: FaGithub, keywords: 'code source', run: link(social.github) },
      { id: 'branzia', group: 'Links', label: 'Visit branzia.app', icon: FiArrowUpRight, keywords: 'company', run: link(profile.branziaUrl) },
    ];
  }, []);
}

export default function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const commands = useCommands();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.group} ${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  // Open with Ctrl+K / ⌘K or "/" (when not typing), or from openPalette().
  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest('input, textarea, [contenteditable="true"]');
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(PALETTE_EVENT, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(PALETTE_EVENT, show);
    };
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery('');
      setActive(0);
      setToast('');
      d.showModal();
      inputRef.current?.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (c: Command | undefined) => {
    if (!c) return;
    const message = c.run();
    if (message) {
      setToast(message);
      setTimeout(() => setOpen(false), 700);
    } else {
      setOpen(false);
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (results.length ? (i + step + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = '';

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      aria-label="Command palette"
      className="m-0 p-0 w-full h-full max-w-none max-h-none bg-transparent backdrop:bg-black/40 backdrop:backdrop-blur-[2px] open:flex items-start justify-center pt-[12vh] px-4"
    >
      <div className="w-[min(560px,100%)] rounded-[14px] border border-line-strong bg-card shadow-lift overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <FiSearch className="text-hint shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            className="flex-1 h-14 bg-transparent outline-none text-ink placeholder:text-hint font-mono text-[0.92rem]"
          />
          <kbd className="font-mono text-[0.7rem] text-hint border border-line rounded px-1.5 py-0.5">esc</kbd>
        </div>

        {toast ? (
          <p role="status" className="px-5 py-8 text-center font-mono text-[0.9rem] text-brand">
            ✓ {toast}
          </p>
        ) : (
          <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-6 text-center font-mono text-[0.85rem] text-hint">command not found: {query}</li>}
            {results.map((c, i) => {
              const header = c.group !== lastGroup ? c.group : null;
              lastGroup = c.group;
              const label = c.id === 'theme' ? `Switch to ${isDark() ? 'light' : 'dark'} mode` : c.label;
              return (
                <li key={c.id} role="presentation">
                  {header && <p className="px-3 pt-3 pb-1.5 font-mono text-[0.7rem] text-hint lowercase">{header}</p>}
                  <div
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(c)}
                    className={`flex items-center gap-3 px-3 h-11 rounded-lg cursor-pointer text-[0.95rem] ${i === active ? 'bg-cream text-ink' : 'text-body'}`}
                  >
                    <span className={i === active ? 'text-brand' : 'text-hint'}>
                      <c.icon size={15} />
                    </span>
                    <span className="flex-1 truncate">{label}</span>
                    {i === active && <FiCornerDownLeft className="text-hint" size={14} aria-hidden />}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center gap-4 px-4 h-10 border-t border-line font-mono text-[0.7rem] text-hint">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span className="ml-auto">{isMac() ? '⌘' : 'Ctrl'} K to toggle</span>
        </div>
      </div>
    </dialog>
  );
}
