import experience from '../data/experience.json';

type Role = (typeof experience)[number] & { current?: boolean };

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 self-start">
          <p className="eyebrow">Experience</p>
          <h2>From agency developer to founder.</h2>
          <p className="lede">
            Fourteen years of PHP, since March 2012, ten of them remote with a US software company, building HIPAA-compliant features, payments and booking systems.
          </p>
          <a href="https://www.linkedin.com/in/visvanathan-d/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
            Full profile on LinkedIn
          </a>
        </div>

        <ol className="relative border-l border-line-strong ml-2">
          {(experience as Role[]).map((r, i) => (
            <li key={r.company} className="reveal relative pl-8 sm:pl-10 pb-12 last:pb-0" style={{ ['--i' as string]: i }}>
              <span
                aria-hidden
                className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-paper ${r.current ? 'bg-accent animate-pulse-dot' : 'bg-line-strong'}`}
              />
              <p className="text-[0.85rem] font-medium text-hint">{r.date}</p>
              <h3 className="mt-1.5 !text-[1.3rem]">
                {r.title} <span className="text-teal">· {r.company}</span>
              </h3>
              <p className="text-[0.9rem] text-hint mt-0.5">{r.place}</p>
              <p className="mt-3 max-w-[38em]">{r.details}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
