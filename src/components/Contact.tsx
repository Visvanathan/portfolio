import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import profile from '../data/profile.json';
import { SocialIcon } from './icons';

const waText = encodeURIComponent('Hi Visvanathan, I came across your website and wanted to say hello.');

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="reveal card relative overflow-hidden grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center p-7 sm:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-mint/20 blur-[90px]" />
          <img
            src="/img/visvanathan-headshot.webp"
            alt="Portrait of Visvanathan D"
            loading="lazy"
            width={220}
            height={220}
            className="relative w-28 h-28 md:w-52 md:h-52 rounded-[26px] object-cover border border-line shadow-card"
          />
          <div className="relative">
            <p className="eyebrow">Say hello</p>
            <h2>Let's connect.</h2>
            <p className="lede">
              Founders, developers and business owners are all welcome. I'm always happy to talk about software, small business and building a company. I reply personally.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="https://www.linkedin.com/in/visvanathan-d/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaLinkedinIn size={16} /> Connect on LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <FiMail /> {profile.email}
              </a>
              <a
                href={`https://wa.me/${profile.branziaWhatsapp.number}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FaWhatsapp size={18} className="text-wa" /> WhatsApp
              </a>
            </div>
            <p className="mt-6 text-[0.95rem]">
              Have a project in mind?{' '}
              <a href={profile.branziaContactUrl} target="_blank" rel="noopener" className="font-semibold text-teal hover:text-teal-deep">
                Tell Branzia what you need →
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 pt-6 border-t border-line text-[0.92rem]">
              <span className="inline-flex items-center gap-2 text-hint">
                <FiMapPin /> {profile.location} · working worldwide
              </span>
              {profile.social.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink no-underline hover:text-teal">
                  <SocialIcon name={s.icon} size={16} /> {s.label} <FiArrowUpRight className="text-hint" size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
