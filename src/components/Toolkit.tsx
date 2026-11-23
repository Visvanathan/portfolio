import skills from '../data/skills.json';

export default function Toolkit() {
  return (
    <section id="toolkit" className="section bg-cream/60 border-y border-line">
      <div className="wrap">
        <div className="reveal max-w-2xl mb-12">
          <p className="eyebrow">Toolkit</p>
          <h2>Built on Laravel, shipped with care.</h2>
          <p className="lede">
            The TALL stack (Tailwind, Alpine.js, Laravel, Livewire) and FilamentPHP at the core, with the payment, shipping and messaging integrations businesses actually need.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((g, i) => (
            <div key={g.group} className={`reveal card p-6 ${i === 0 ? 'lg:row-span-2 bg-ink !border-ink' : ''} ${['Integrations', 'Infrastructure'].includes(g.group) ? 'lg:col-span-2' : ''}`} style={{ ['--i' as string]: i % 3 }}>
              <h3 className={`!font-mono !text-[0.8rem] lowercase ${i === 0 ? '!text-paper/70' : '!text-hint'}`}>{g.group}</h3>
              {i === 0 ? (
                <ul className="mt-5 space-y-2">
                  {g.items.map((s) => (
                    <li key={s} className="font-head text-paper text-[clamp(1.35rem,2.2vw,1.75rem)] leading-tight tracking-tight">
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-wrap gap-2 mt-4">
                  {g.items.map((s) => (
                    <li key={s} className="px-3 py-1.5 rounded-md bg-cream border border-line font-mono text-[0.8rem] text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
