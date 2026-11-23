import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 py-8 text-[0.88rem] text-hint">
        <p>
          © {new Date().getFullYear()} {profile.name} · Pondicherry, India
        </p>
        <a href="#top" className="no-underline hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
