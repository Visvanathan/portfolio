import { FiArrowDown } from 'react-icons/fi';
import profile from '../data/profile.json';
import works from '../data/work.json';
import { SocialIcon } from './icons';
import { AboutRow, CodeWindow } from './Code';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[120px] pb-16 sm:pt-[148px] sm:pb-24">
      <div className="wrap grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-center">
        <div>
          <p className="animate-enter mb-7 font-mono text-[0.82rem] text-hint">
            <span className="text-brand">~/</span>visvanathan · {profile.location}
            <span className="inline-block w-[0.5em] h-[1.05em] ml-1 align-[-0.15em] bg-brand animate-blink" aria-hidden />
          </p>

          <h1 className="animate-enter [--i:1]">
            I build the software a business <em className="italic font-normal text-brand">quietly depends on.</em>
          </h1>

          <p className="lede animate-enter [--i:2]">
            I'm Visvanathan, a Laravel and FilamentPHP developer. I write the software companies in the US and India rely on: booking engines, payment flows and the admin panels behind them. These days I'm also the founder of{' '}
            <a href={profile.branziaUrl} target="_blank" rel="noopener" className="text-ink font-medium underline decoration-line-strong underline-offset-4 hover:decoration-brand">Branzia</a>.
          </p>

          <div className="animate-enter [--i:3] flex flex-wrap items-center gap-3 mt-9">
            <a href="#work" className="btn btn-primary">
              See my work <FiArrowDown />
            </a>
            <a href="#story" className="btn btn-ghost">
              Read my story
            </a>
            <div className="flex items-center gap-1 ml-1">
              {profile.social.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}: Visvanathan D`}
                  className="grid place-items-center w-11 h-11 rounded-full text-body hover:text-ink hover:bg-cream transition-colors"
                >
                  <SocialIcon name={s.icon} size={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="animate-enter [--i:2] relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="relative rounded-[18px] overflow-hidden shadow-lift border border-line aspect-[4/5] bg-cream">
            <img
              src="/img/visvanathan-desk.webp"
              alt="Visvanathan D at his desk, with code on the monitors and a system diagram on the whiteboard"
              className="w-full h-full object-cover"
              width={1122}
              height={1402}
              fetchPriority="high"
            />
          </div>

          {/* `php artisan about`, but for me */}
          <CodeWindow
            title="~/visvanathan — zsh"
            className="relative -mt-14 mx-4 sm:mx-8 lg:absolute lg:m-0 lg:-left-14 lg:-bottom-12 lg:w-[360px]"
          >
            <span className="block">
              <span className="text-[#e8875f]">$</span> php artisan about <span className="text-white/45">--me</span>
            </span>
            <span className="block mt-2 text-[#e6c07b]">Visvanathan D</span>
            <AboutRow label="Stack" value="Laravel · FilamentPHP" />
            <AboutRow label="Mobile" value="React Native" />
            <AboutRow label="Architecture" value="Monolith · Microservices" />
            <AboutRow label="Experience" value="14+ years" />
            <AboutRow label="Location" value="Pondicherry, IN" />
            <AboutRow label="Now" value={<span className="text-[#b5cc8e]">Founder, Branzia</span>} />
            <span className="block mt-2">
              <span className="text-[#e8875f]">$</span> <span className="inline-block w-[0.55em] h-[1.1em] align-[-0.2em] bg-[#e9e3d9]/80 animate-blink" aria-hidden />
            </span>
          </CodeWindow>
        </div>
      </div>

      {/* Stats */}
      <div className="wrap mt-16 sm:mt-24">
        <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-[14px] border border-line bg-card divide-line [&>div]:border-line">
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal px-6 py-6 sm:px-8 sm:py-7 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
              style={{ ['--i' as string]: i }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-head font-medium text-ink text-[clamp(1.8rem,3vw,2.4rem)] leading-none tracking-tight">{'count' in s && s.count === 'work' ? works.length : s.value}</dd>
              <dd aria-hidden className="mt-2 text-[0.92rem] text-hint">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
