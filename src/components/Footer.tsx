import profile from '../data/profile.json';

// Stamped at build time (vite.config.ts), so it shows when the live site was last deployed.
// A dev server started before that setting existed has no __BUILD_DATE__; fall back to now rather than crash the page.
const builtAt = typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : new Date().toISOString();
const updated = new Date(builtAt);
const updatedLabel = updated.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 py-8 text-[0.88rem] text-hint">
        <p>
          © {new Date().getFullYear()} {profile.name} · Pondicherry, India
        </p>
        <p className="font-mono text-[0.78rem]">
          last updated <time dateTime={builtAt}>{updatedLabel}</time> · React + Vite + Tailwind
        </p>
        <a href="#top" className="no-underline hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
