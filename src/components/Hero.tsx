import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import profile from '../data/profile.json';
import { SocialIcon } from './icons';
import { BranziaMark } from './BranziaLogo';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[120px] pb-16 sm:pt-[148px] sm:pb-24">
      {/* Soft brand glow + dot grid behind the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-mint/25 blur-[120px] dark:bg-mint/10" />
        <div className="absolute top-60 -left-48 w-[480px] h-[480px] rounded-full bg-rose/30 blur-[120px] dark:bg-rose/5" />
        <div className="absolute inset-0 grain opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      <div className="wrap grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-center">
        <div>
          <a
            href={profile.branziaUrl}
            target="_blank"
            rel="noopener"
            className="animate-enter inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 mb-7 rounded-full bg-card border border-line shadow-card no-underline text-[0.88rem] text-body hover:border-line-strong transition-colors"
          >
            <span className="grid place-items-center size-7 rounded-full bg-accent-soft text-teal-deep">
              <BranziaMark className="size-3.5" />
            </span>
            <span>
              Founder of <strong className="text-ink font-semibold">Branzia</strong>
            </span>
            <FiArrowUpRight className="text-hint" />
          </a>

          <h1 className="animate-enter [--i:1]">
            I build the software{' '}
            {/* Wraps freely on phones; the hand-drawn underline only shows once it fits on one line. */}
            <span className="relative sm:whitespace-nowrap text-teal">
              small businesses
              <svg aria-hidden viewBox="0 0 300 12" preserveAspectRatio="none" className="hidden sm:block absolute left-0 -bottom-2 w-full h-3 text-mint">
                <path d="M2 9 C 80 2, 200 2, 298 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{' '}
            run on.
          </h1>

          <p className="lede animate-enter [--i:2]">
            I'm Visvanathan, a Laravel developer with 14+ years of experience. I've built booking platforms, admin dashboards, online stores and tourism websites for businesses in the US and India. Today I run <strong className="text-ink font-semibold">Branzia</strong>, a founder-led software company that builds websites, online stores, apps, custom software and automation for small businesses.
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

        {/* Portrait with floating notes */}
        <div className="animate-enter [--i:2] relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="relative rounded-[28px] overflow-hidden shadow-lift border border-line aspect-[4/5] bg-cream">
            <img
              src="/img/visvanathan-desk.webp"
              alt="Visvanathan D at his desk, with code on the monitors and a system diagram on the whiteboard"
              className="w-full h-full object-cover"
              width={1122}
              height={1402}
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute left-5 bottom-5 text-white">
              <p className="font-head font-semibold text-lg leading-tight">Visvanathan D</p>
              <p className="text-sm text-white/80">{profile.location}</p>
            </div>
          </div>

          <div className="absolute -left-4 sm:-left-10 top-10 card px-4 py-3 animate-float flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot" />
            <div className="leading-tight">
              <p className="text-[0.72rem] uppercase tracking-wider text-hint">Currently building</p>
              <p className="font-head font-semibold text-ink text-[0.95rem]">Branzia</p>
            </div>
          </div>

          <div className="absolute -right-3 sm:-right-8 bottom-24 card px-4 py-3 animate-float [animation-delay:-3s]">
            <p className="font-head font-semibold text-ink text-2xl leading-none">14+</p>
            <p className="text-[0.8rem] text-hint mt-1">years with PHP &amp; Laravel</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="wrap mt-16 sm:mt-24">
        <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-[22px] border border-line bg-card/70 backdrop-blur divide-line [&>div]:border-line">
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal px-6 py-6 sm:px-8 sm:py-7 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
              style={{ ['--i' as string]: i }}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-head font-semibold text-ink text-[clamp(1.8rem,3vw,2.4rem)] leading-none tracking-tight">{s.value}</dd>
              <dd className="mt-2 text-[0.92rem] text-hint">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
