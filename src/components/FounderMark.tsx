// Visvanathan D's monogram: the V's right arm doubles as the D's stem, and the D's curve wraps back to the V's point.
// The same shapes are inlined in 404.html and offline.html, and drawn into the favicons.
export default function FounderMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="5.5 6 52 52" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M38 14 C60 14 61 50 24 50" className="stroke-accent" />
      <path d="M10 14 L24 50 L38 14" className="stroke-teal-deep" />
    </svg>
  );
}
