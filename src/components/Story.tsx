// Founder story: the personal "why" behind Branzia. Edit the paragraphs freely;
// they are written in first person and should sound like you.
const chapters = [
  {
    year: '2012',
    title: 'Learning the trade',
    text: 'I started at an agency in Chennai, building Magento and WordPress sites with custom themes, modules and integrations. Every client ran their business differently, and the work only succeeded when the software fit the way they actually worked.',
  },
  {
    year: '2014',
    title: 'Ten years with one US team',
    text: 'I joined a US software company remotely and stayed for a decade, building booking logic, payment systems and HIPAA-compliant medical features for products people relied on. That is where I learned that launching software is the easy part; keeping it reliable for years is the real job.',
  },
  {
    year: 'Today',
    title: 'Building my own company',
    text: 'Small businesses kept asking me for the same thing: software that takes repetitive work off their plate, built by someone who listens. Most could not afford an agency. So I started Branzia, and for the first time the decisions, and the code, are mine from the first line.',
  },
];

const enjoys = ['Booking, pricing and payment logic', 'Admin dashboards people actually like using', 'Turning manual routines into automation', 'Online stores that are easy to run'];

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">My story</p>
          <h2>Fourteen years of building software for other people's businesses.</h2>
          <p className="lede">
            I have spent my whole career on the practical side of software: the bookings, payments and back offices that a business depends on.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-14">
          {chapters.map((c, i) => (
            <li key={c.year} className="reveal card p-7 flex flex-col" style={{ ['--i' as string]: i }}>
              <span className="self-start inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent-soft font-mono text-brand text-[0.78rem] leading-none">
                {c.year === 'Today' ? (
                  <>
                    HEAD <span className="text-hint">-&gt;</span> main
                  </>
                ) : (
                  <>
                    <span className="text-hint">tag:</span> v{c.year}
                  </>
                )}
              </span>
              <h3 className="mt-5">{c.title}</h3>
              <p className="mt-2 text-[0.97rem]">{c.text}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="font-head text-lg text-ink shrink-0">What I enjoy building</p>
          <ul className="flex flex-wrap gap-2">
            {enjoys.map((e) => (
              <li key={e} className="chip !text-[0.88rem] !py-1.5">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
