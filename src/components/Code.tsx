import type { ReactNode } from 'react';

// Developer touches: a dark editor/terminal window and a tiny set of syntax colours.
// The window stays dark in both themes, like a real editor.

export function CodeWindow({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[12px] overflow-hidden border border-black/40 bg-[#171411] text-[#e9e3d9] shadow-lift ${className}`}>
      <div className="flex items-center gap-1.5 px-3.5 h-8 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-mono text-[0.7rem] text-white/45">{title}</span>
      </div>
      <pre className="m-0 px-4 py-4 overflow-x-auto font-mono text-[0.78rem] leading-[1.75] [font-variant-ligatures:none]">{children}</pre>
    </div>
  );
}

// Syntax colours, tuned for the dark window above.
export const Kw = ({ children }: { children: ReactNode }) => <span className="text-[#e8875f]">{children}</span>;
export const Ty = ({ children }: { children: ReactNode }) => <span className="text-[#e6c07b]">{children}</span>;
export const Fn = ({ children }: { children: ReactNode }) => <span className="text-[#8fbcd4]">{children}</span>;
export const Str = ({ children }: { children: ReactNode }) => <span className="text-[#b5cc8e]">{children}</span>;
export const Cm = ({ children }: { children: ReactNode }) => <span className="text-white/40 italic">{children}</span>;

/** One `php artisan about`-style row: label, dotted leader, value. */
export function AboutRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-white/60 shrink-0">{label}</span>
      <span aria-hidden className="flex-1 border-b border-dotted border-white/20 translate-y-[-4px]" />
      <span className="text-right">{value}</span>
    </span>
  );
}
