import { useState } from 'react';
import { FiCheck, FiCopy, FiMail } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa6';
import profile from '../data/profile.json';
import { CodeWindow, Str } from './Code';

function JsonRow({ k, v, href, last }: { k: string; v: string; href?: string; last?: boolean }) {
  const value = <Str>"{v}"</Str>;
  return (
    <span className="block whitespace-pre">
      {'  '}
      <span className="text-[#8fbcd4]">"{k}"</span>: {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 hover:decoration-[#b5cc8e]">
          {value}
        </a>
      ) : (
        value
      )}
      {last ? '' : ','}
    </span>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard
      ?.writeText(profile.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => undefined);
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      title={copied ? 'Copied' : 'Copy email'}
      className={`btn btn-ghost !px-0 w-12.5 ${copied ? '!text-brand !border-brand' : ''}`}
    >
      {copied ? <FiCheck /> : <FiCopy />}
      <span role="status" className="sr-only">{copied ? 'Email address copied' : ''}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section pt-0">
      <div className="wrap">
        <div className="reveal card grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center p-7 sm:p-12 lg:p-16">
          <img
            src="/img/visvanathan-headshot.webp"
            alt="Portrait of Visvanathan D"
            loading="lazy"
            width={220}
            height={220}
            className="w-28 h-28 md:w-52 md:h-52 rounded-[14px] object-cover border border-line"
          />
          <div>
            <p className="eyebrow">Say hello</p>
            <h2>Let's talk.</h2>
            <p className="lede">
              Developers, founders and business owners are all welcome. I'm happy to talk about Laravel, remote work, small business or starting a company. I read and reply to every message myself.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="https://www.linkedin.com/in/visvanathan-d/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaLinkedinIn size={16} /> Connect on LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <FiMail /> {profile.email}
              </a>
              <CopyEmail />
            </div>
            {/* The same details as data. Every value is a working link. */}
            <CodeWindow title="contact.json" className="mt-8 !shadow-none">
              {'{\n'}
              <JsonRow k="name" v={profile.name} />
              <JsonRow k="location" v={profile.location} />
              <JsonRow k="email" v={profile.email} href={`mailto:${profile.email}`} />
              {profile.social.map((s, i) => (
                <JsonRow key={s.url} k={s.label.toLowerCase()} v={s.url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')} href={s.url} last={i === profile.social.length - 1} />
              ))}
              {'}'}
            </CodeWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
