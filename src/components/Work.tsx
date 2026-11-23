import { useMemo, useState } from 'react';
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import works from '../data/work.json';
import Lightbox from './Lightbox';

export type WorkItem = (typeof works)[number] & { featured?: boolean; contain?: boolean };

const filters = [
  { key: 'all', label: 'All work' },
  { key: 'app', label: 'Web apps & dashboards' },
  { key: 'site', label: 'Websites' },
  { key: 'store', label: 'Catalogues' },
] as const;

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

function Frame({ work, tall }: { work: WorkItem; tall?: boolean }) {
  return (
    <div className="relative rounded-[16px] overflow-hidden border border-line bg-cream">
      <div className="flex items-center gap-1.5 px-3.5 h-8 border-b border-line bg-card">
        <span className="w-2.5 h-2.5 rounded-full bg-rose" />
        <span className="w-2.5 h-2.5 rounded-full bg-sage" />
        <span className="w-2.5 h-2.5 rounded-full bg-mint" />
        <span className="ml-3 truncate text-[0.72rem] text-hint">{host(work.link)}</span>
      </div>
      <div className={`${tall ? 'aspect-[16/11]' : 'aspect-[16/10]'} overflow-hidden ${work.contain ? 'bg-white grid place-items-center' : ''}`}>
        <img
          src={`/work/${work.slug}/thumb.webp`}
          alt={`${work.title}: ${work.category.toLowerCase()} screenshot`}
          loading="lazy"
          decoding="async"
          className={work.contain ? 'w-3/4 h-auto' : 'pan w-full h-full object-cover'}
        />
      </div>
    </div>
  );
}

function Card({ work, onOpen, featured, index, refiltered }: { work: WorkItem; onOpen: () => void; featured?: boolean; index: number; refiltered: boolean }) {
  return (
    <article
      className={`${refiltered ? 'animate-enter' : 'reveal'} group card p-3 sm:p-3.5 flex flex-col transition-[box-shadow,translate] duration-300 hover:shadow-lift hover:-translate-y-1 ${featured ? 'md:col-span-3' : 'md:col-span-2'}`}
      style={{ ['--i' as string]: index % 3 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block text-left cursor-zoom-in rounded-[16px]"
        aria-label={`View ${work.images} screenshot${work.images > 1 ? 's' : ''} of ${work.title}`}
      >
        <Frame work={work} tall={featured} />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-[0.78rem] backdrop-blur opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <FiMaximize2 size={13} /> {work.images} screen{work.images > 1 ? 's' : ''}
        </span>
      </button>

      <div className="flex flex-col flex-1 px-2.5 pt-5 pb-2">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-teal">{work.category}</p>
        <div className="flex items-start justify-between gap-4 mt-1.5">
          <h3 className={featured ? 'text-[1.45rem]' : ''}>{work.title}</h3>
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${work.title} (opens in a new tab)`}
            className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-line text-ink hover:bg-teal hover:text-paper hover:border-teal transition-colors"
          >
            <FiArrowUpRight />
          </a>
        </div>
        <p className="mt-2 text-[0.96rem] leading-relaxed">{work.summary}</p>
        <ul className="flex flex-wrap gap-1.5 mt-auto pt-5">
          {work.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]['key']>('all');
  const [open, setOpen] = useState<WorkItem | null>(null);
  const [refiltered, setRefiltered] = useState(false);

  const list = useMemo(() => (works as WorkItem[]).filter((w) => filter === 'all' || w.kind === filter), [filter]);

  // Wide cards sit two to a row, the rest three to a row. Featured projects are wide in
  // the "All" view, and the tail is balanced so no row is left with a single card.
  const wide = useMemo(() => {
    const featured = filter === 'all' ? list.filter((w) => w.featured) : [];
    const rest = list.filter((w) => !featured.includes(w));
    const tail = rest.length % 3 === 2 ? 2 : rest.length % 3 === 1 ? 4 : 0;
    return new Set([...featured, ...rest.slice(rest.length - tail)].map((w) => w.slug));
  }, [list, filter]);

  return (
    <section id="work" className="section bg-cream/60 border-y border-line">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2>Software that real businesses run on every day.</h2>
            <p className="lede">
              Booking systems, admin dashboards, tourism websites and product catalogues, built over a decade of remote work with teams in the US and India. Click any project to browse the screens.
            </p>
          </div>
          <div role="tablist" aria-label="Filter projects" className="reveal flex flex-wrap gap-1.5 p-1.5 rounded-full bg-card border border-line self-start lg:self-end">
            {filters.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => {
                  setFilter(f.key);
                  setRefiltered(true);
                }}
                className={`px-4 py-2 rounded-full text-[0.88rem] font-medium cursor-pointer transition-colors ${
                  filter === f.key ? 'bg-teal text-paper' : 'text-body hover:text-ink hover:bg-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div key={filter} className="grid md:grid-cols-6 gap-5 sm:gap-6">
          {list.map((w, i) => (
            <Card key={w.slug} work={w} index={i} featured={wide.has(w.slug)} refiltered={refiltered} onOpen={() => setOpen(w)} />
          ))}
        </div>
      </div>

      {open && <Lightbox work={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
