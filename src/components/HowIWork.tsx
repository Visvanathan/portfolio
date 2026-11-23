// How I approach the work: personal habits from fourteen years of client software, written in first person.
const items = [
  { title: 'Watch the work before writing code', text: 'I start with how people do the job today, workarounds and all. Good software removes steps from that routine instead of adding new ones.' },
  { title: 'Build it to be maintained', text: 'Tests in Pest, readable code and proven choices over clever ones, because software has to keep working for years after launch.' },
  { title: 'Say when software isn’t the answer', text: 'If a simple fix or an existing tool is enough, I’d rather say so than build something nobody needs.' },
  { title: 'Pick the architecture the problem needs', text: 'A well-structured monolith is often the right call; microservices earn their place when parts must scale or ship on their own. I’ve built and run both.' },
  { title: 'One backend, every screen', text: 'The same Laravel API can power the website, the admin panel and the React Native app on Android and iOS, so the business logic lives in one place.' },
  { title: 'Show working software early', text: 'I build in small steps, so the people who’ll use it can try real screens long before launch.' },
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="section pt-0">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 self-start">
          <p className="eyebrow">How I work</p>
          <h2>A few things the job has taught me.</h2>
        </div>
        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {items.map((it, i) => (
            <li key={it.title} className="reveal border-t border-line-strong pt-5" style={{ ['--i' as string]: i % 2 }}>
              <span className="font-mono text-[0.8rem] text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2">{it.title}</h3>
              <p className="mt-2 text-[0.97rem]">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
