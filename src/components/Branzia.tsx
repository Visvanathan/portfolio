import { FiArrowUpRight, FiBell, FiCode, FiLink, FiMonitor, FiShoppingBag, FiSmartphone, FiZap } from 'react-icons/fi';
import profile from '../data/profile.json';
import { BranziaLogo } from './BranziaLogo';

// Mirrors the seven services on branzia.app (Landing/data/home.json). Keep names and order in sync;
// `page` is the service page's address on branzia.app.
const services = [
  { icon: FiShoppingBag, title: 'Online Stores', page: 'ecommerce-website-development', text: 'Your own store, in English, Tamil or both, with catalogue, cart, online payments and delivery.' },
  { icon: FiZap, title: 'Business Automation', page: 'business-automation-ai', text: 'Automatic Instagram and Facebook replies and WhatsApp broadcasts, in English, Tamil or Tanglish.' },
  { icon: FiSmartphone, title: 'Mobile Apps', page: 'mobile-app-development', text: 'An app for your customers to browse, order and pay, connected to your website or store.' },
  { icon: FiBell, title: 'Admin App', page: 'admin-app-development', text: 'Your own admin app on Google Play, for orders, payments and quotes away from your desk.' },
  { icon: FiMonitor, title: 'Business Websites', page: 'business-website-development', text: 'A professional website, in English, Tamil or both, that shows your business and brings in enquiries.' },
  { icon: FiCode, title: 'Custom Business Software', page: 'custom-software-development', text: 'One system to manage your orders, customers, products and daily work.' },
  { icon: FiLink, title: 'Integrations & Technical Support', page: 'integrations-technical-support', text: 'Payments, shipping and the services you use, connected, plus maintenance, performance work and fixes.' },
];

export default function Branzia() {
  return (
    <section id="branzia" className="section">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-panel text-panel-ink px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-mint/20 blur-[110px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-rose/10 blur-[110px]" />

          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 self-start">
              <BranziaLogo className="block h-9 w-auto text-panel-ink mb-8" />
              <p className="eyebrow !text-mint">My company</p>
              <h2 className="!text-panel-ink">Branzia: software that does the busywork, so you can run the business.</h2>
              <p className="lede text-panel-ink/75">
                Branzia is a founder-led software company in Pondicherry. It builds websites, online stores, apps, custom software and automation for businesses in India and abroad, and supports everything after launch. The person who hears your requirements is the person who writes the code.
              </p>
              <div className="flex flex-wrap gap-3 mt-9">
                <a href={profile.branziaContactUrl} target="_blank" rel="noopener" className="btn btn-light">
                  Tell Branzia what you need <FiArrowUpRight />
                </a>
                <a
                  href={`${profile.branziaUrl}services/`}
                  target="_blank"
                  rel="noopener"
                  className="btn border-panel-ink/25 text-panel-ink hover:border-panel-ink/60 hover:bg-white/5"
                >
                  All services
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="reveal !text-panel-ink/60 !text-[0.8rem] uppercase tracking-[0.12em]">Services</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {services.map((s, i) => (
                  <li key={s.page} className={`reveal ${i === services.length - 1 ? 'sm:col-span-2' : ''}`} style={{ ['--i' as string]: i % 2 }}>
                    <a
                      href={`${profile.branziaUrl}services/${s.page}/`}
                      target="_blank"
                      rel="noopener"
                      className="group/s flex flex-col h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 no-underline hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                    >
                      <span className="flex items-center justify-between">
                        <s.icon className="text-mint" size={20} aria-hidden />
                        <FiArrowUpRight className="text-panel-ink/30 group-hover/s:text-mint transition-colors" aria-hidden />
                      </span>
                      <span className="mt-3 font-head font-semibold text-panel-ink">{s.title}</span>
                      <span className="text-[0.92rem] text-panel-ink/65 mt-1 leading-snug">{s.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="reveal text-[0.94rem] text-panel-ink/65 border-t border-white/10 pt-5">
                Every project starts with a written plan: what will be built, how long it takes and what it costs, including any recurring charges. Maintenance and managed services keep it running after launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
