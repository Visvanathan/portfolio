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
    text: 'I joined a US software company remotely and stayed for a decade, building booking logic, payment systems and HIPAA-compliant medical features for products people relied on every day. That is where I learned that launching software is the easy part; keeping it reliable for years is the real job.',
  },
  {
    year: 'Today',
    title: 'Founding Branzia',
    text: 'Small businesses kept asking for the same thing: software that takes repetitive work off their plate, built by someone who listens. Most could not afford an agency or trust a stranger online. I started Branzia to give them the quality I had been delivering to larger companies, with the founder writing the code.',
  },
];

const enjoys = ['Booking, pricing and payment logic', 'Admin dashboards people enjoy using', 'Turning manual routines into automation', 'Online stores that are easy to run'];

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">My story</p>
          <h2>Fourteen years of building software for other people's businesses.</h2>
          <p className="lede">
            I have spent my whole career on the practical side of software: the bookings, payments and back offices that a business depends on. Branzia is where that experience now goes.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-14">
          {chapters.map((c, i) => (
            <li key={c.year} className="reveal card p-7 flex flex-col" style={{ ['--i' as string]: i }}>
              <span className="font-head font-semibold text-teal text-[clamp(1.8rem,3vw,2.3rem)] leading-none tracking-tight">{c.year}</span>
              <h3 className="mt-5">{c.title}</h3>
              <p className="mt-2 text-[0.97rem]">{c.text}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="font-head font-semibold text-ink shrink-0">What I enjoy building</p>
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
