import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 py-8 text-[0.88rem] text-hint">
        <p>
          © {new Date().getFullYear()} {profile.name}. Founder of{' '}
          <a href={profile.branziaUrl} target="_blank" rel="noopener" className="text-ink hover:text-teal">
            Branzia
          </a>
          .
        </p>
        <a href="#top" className="no-underline hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
