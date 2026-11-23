import { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import type { WorkItem } from './Work';

/**
 * Full-screen screenshot viewer. Screenshots are full-page captures, so each one
 * is shown at readable width and scrolls vertically instead of being shrunk to fit.
 */
export default function Lightbox({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const count = work.images;
  const src = (n: number) => `/work/${work.slug}/${n + 1}.webp`;

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    const d = dialogRef.current;
    d?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    scrollRef.current?.scrollTo({ top: 0 });
    if (count > 1) new Image().src = src((index + 1) % count); // preload the next screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      aria-label={`${work.title} screenshots`}
      className="fixed inset-0 m-0 p-0 w-screen h-dvh max-w-none max-h-none bg-[#0b1413]/95 text-white backdrop:bg-transparent open:flex flex-col"
    >
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 h-16 border-b border-white/10">
        <div className="min-w-0">
          <p className="font-head font-semibold truncate">{work.title}</p>
          <p className="text-[0.8rem] text-white/60 truncate">{work.category}</p>
        </div>
        <div className="flex items-center gap-2">
          {count > 1 && (
            <span className="hidden sm:inline text-sm text-white/70 tabular-nums mr-2" aria-live="polite">
              {index + 1} / {count}
            </span>
          )}
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium no-underline text-white transition-colors"
          >
            Visit site <FiArrowUpRight />
          </a>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            autoFocus
            className="grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}>
        <div className="mx-auto max-w-[1180px] px-3 sm:px-20 py-6 sm:py-10" onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}>
          {!loaded && <div className="w-full aspect-[16/10] rounded-xl bg-white/5 animate-pulse" />}
          <img
            key={index}
            src={src(index)}
            alt={`${work.title}, screen ${index + 1} of ${count}`}
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto rounded-xl shadow-2xl bg-white ${loaded ? 'animate-enter' : 'absolute opacity-0'}`}
          />
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screen"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur cursor-pointer transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screen"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur cursor-pointer transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
          <footer className="shrink-0 flex justify-center gap-1.5 py-3 border-t border-white/10 overflow-x-auto px-4">
            {Array.from({ length: count }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setIndex(n)}
                aria-label={`Screen ${n + 1}`}
                aria-current={n === index}
                className={`h-1.5 rounded-full cursor-pointer transition-all ${n === index ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </footer>
        </>
      )}
    </dialog>
  );
}
