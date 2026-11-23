const items = [
  { title: 'You talk to the person building it', text: 'The person who hears your requirements is the person who writes the code. Nothing gets lost in between.' },
  { title: 'A written plan before work starts', text: 'You see what will be built, how long it takes and what it costs, including recurring charges, before you commit.' },
  { title: 'An honest answer', text: "If a simple solution is enough, I'll tell you, even when it means you don't need new software." },
  { title: 'Working software early', text: 'Projects are built in stages, so you review real software as it takes shape.' },
  { title: 'Clear ownership', text: 'Your agreement sets out what belongs to you, including your content, your data and the deliverables made specifically for your business.' },
  { title: 'Support after launch', text: 'Maintenance and managed services keep your website or software running well once it is live.' },
];

export default function Principles() {
  return (
    <section className="section pt-0">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 self-start">
          <p className="eyebrow">How I build</p>
          <h2>The principles Branzia is built on.</h2>
          <p className="lede">Habits from a decade of working with the same US team, now the standard for every Branzia project.</p>
        </div>
        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {items.map((it, i) => (
            <li key={it.title} className="reveal border-t border-line-strong pt-5" style={{ ['--i' as string]: i % 2 }}>
              <span className="font-head text-[0.85rem] font-semibold text-teal tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2">{it.title}</h3>
              <p className="mt-2 text-[0.97rem]">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
