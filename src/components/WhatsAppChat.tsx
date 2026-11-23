import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiSend, FiX } from 'react-icons/fi';
import profile from '../data/profile.json';
import { BranziaMark } from './BranziaLogo';

// The floating WhatsApp button and its chat window, matching the one on branzia.app (Landing/templates/chat.mjs).
// It goes to Branzia's business WhatsApp (profile.branziaWhatsapp). Text comes from profile.chat.
// The window uses fixed WhatsApp colours in both themes, like the app itself.
const { chat } = profile;
const waUrl = (text?: string) => `https://wa.me/${profile.branziaWhatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const toggleRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const send = (message: string) => {
    window.open(waUrl(message), '_blank', 'noopener');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const message = text.trim();
    if (!message) return inputRef.current?.focus();
    setText('');
    send(message);
  };

  // Enter sends; Shift+Enter starts a new line.
  const onInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="fixed right-[max(20px,env(safe-area-inset-right))] bottom-[max(20px,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 print:hidden">
      <section
        id="wa-box"
        aria-label={chat.title}
        hidden={!open}
        className="flex flex-col w-[min(352px,calc(100vw-40px))] max-h-[calc(100vh-110px)] overflow-hidden bg-wa-panel rounded-[20px] shadow-chat"
      >
        <div className="flex flex-none items-center gap-2.5 px-3.5 py-3 bg-wa-dark text-white">
          <span className="grid flex-none place-items-center size-10 bg-white rounded-full text-wa-ink" aria-hidden>
            <BranziaMark className="size-5" />
          </span>
          <div>
            <strong className="block font-head font-semibold text-[0.98rem]/[1.25]">{chat.title}</strong>
            <small className="block text-[0.8rem]/[1.3] opacity-85">{chat.subtitle}</small>
          </div>
          <button type="button" onClick={close} aria-label="Close chat" className="grid flex-none place-items-center size-8.5 ml-auto rounded-[10px] cursor-pointer hover:bg-white/16 focus-visible:bg-white/16">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 min-h-0 px-3.5 py-4 overflow-y-auto bg-wa-wall">
          <p className="w-fit max-w-[88%] px-3.25 py-2.5 bg-white rounded-[14px_14px_14px_4px] shadow-bubble text-wa-ink text-[0.95rem]/[1.4]">{chat.greeting}</p>
          <div className="grid gap-2 mt-3.5">
            {chat.quickReplies.map((reply) => (
              <button
                key={reply.label}
                type="button"
                onClick={() => send(reply.message)}
                className="w-full px-3.5 py-2.5 bg-white border border-black/8 rounded-xl text-wa-ink text-[0.92rem]/[1.3] font-medium text-left cursor-pointer transition-colors hover:bg-wa-tint hover:text-wa-dark focus-visible:bg-wa-tint focus-visible:text-wa-dark motion-reduce:transition-none"
              >
                {reply.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-none items-end gap-2 px-3 py-2.5">
          <textarea
            ref={inputRef}
            id="wa-message"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onInputKey}
            aria-label="Your message"
            placeholder={chat.placeholder}
            className="flex-1 min-w-0 max-h-24 px-3.5 py-2 bg-white rounded-[19px] text-wa-ink placeholder:text-black/45 text-base/[1.35] resize-none outline-none focus-visible:ring-2 focus-visible:ring-wa"
          />
          <button type="submit" aria-label="Send on WhatsApp" title="Send on WhatsApp" className="grid flex-none place-items-center size-9.5 bg-wa rounded-full text-white cursor-pointer hover:bg-wa-hover focus-visible:bg-wa-hover">
            <FiSend size={17} />
          </button>
        </form>
      </section>

      {/* Without JavaScript this is a plain link to WhatsApp; with it, it opens the chat window. */}
      <a
        ref={toggleRef}
        href={waUrl()}
        target="_blank"
        rel="noopener"
        role="button"
        aria-controls="wa-box"
        aria-expanded={open}
        aria-label="Chat with Branzia on WhatsApp"
        title="Chat with Branzia on WhatsApp"
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="grid place-items-center size-14.5 rounded-full bg-wa text-white shadow-float transition-[background-color,translate] duration-200 hover:bg-wa-hover hover:-translate-y-0.5 focus-visible:bg-wa-hover focus-visible:-translate-y-0.5 motion-reduce:transition-none"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}
