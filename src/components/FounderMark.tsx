import { useEffect, useRef } from 'react';

// Visvanathan D's monogram: the V's right arm doubles as the D's stem, and the D's curve wraps back to the V's point.
// The same shapes are inlined in 404.html and offline.html, and drawn into the favicons.
//
// With `draw`, the strokes draw themselves on load like a pen plotter (V first, then the D's curve; CSS in
// index.css), and replay when the pointer enters the surrounding link. pathLength="1" lets the CSS animate
// any path from 0 to 1.
export default function FounderMark({ className, draw = false }: { className?: string; draw?: boolean }) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const host = draw ? svg.current?.closest('a') : null;
    if (!host) return;
    // cancel() + play() restarts a CSS animation from the beginning, keeping its delays.
    const replay = () => svg.current?.getAnimations({ subtree: true }).forEach((a) => (a.cancel(), a.play()));
    host.addEventListener('pointerenter', replay);
    return () => host.removeEventListener('pointerenter', replay);
  }, [draw]);

  return (
    <svg
      ref={svg}
      className={`${draw ? 'mark-draw' : ''} ${className ?? ''}`}
      viewBox="5.5 6 52 52"
      fill="none"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M38 14 C60 14 61 50 24 50" pathLength={1} className="stroke-brand mark-d" />
      <path d="M10 14 L24 50 L38 14" pathLength={1} className="stroke-ink mark-v" />
    </svg>
  );
}
