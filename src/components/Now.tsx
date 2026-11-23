import { FiArrowUpRight } from 'react-icons/fi';
import profile from '../data/profile.json';

// What I'm working on today. Branzia gets one short card here: its services and sales pitch live on branzia.app.
export default function Now() {
  return (
    <section id="now" className="section">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">
        <div className="reveal">
          <p className="eyebrow">Now</p>
          <h2>What I'm building today.</h2>
        </div>

        <div className="reveal card p-7 sm:p-10" style={{ ['--i' as string]: 1 }}>
          <p className="flex items-center gap-2.5 font-mono text-[0.8rem] text-hint">
            <span className="size-2 rounded-full bg-accent animate-pulse-dot" aria-hidden />
            Founder · Pondicherry
          </p>
          <h3 className="mt-4 !text-[1.7rem]">Branzia</h3>
          <p className="mt-3 max-w-[40em]">
            After more than a decade building for other companies, I started Branzia to give small businesses the same standard of software: websites, online stores, apps and automation, with the person who hears the requirements writing the code. It's where most of my working hours go.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
            <a href={profile.branziaUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              Visit branzia.app <FiArrowUpRight />
            </a>
            <a href={profile.branziaContactUrl} target="_blank" rel="noopener" className="text-[0.95rem] font-medium text-brand hover:text-brand-deep">
              Have a project? Tell Branzia what you need →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
