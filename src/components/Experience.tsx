import experience from '../data/experience.json';

// A role sits on the main line, or on a side branch ("lane": "branch" in experience.json) for work done
// alongside it. The timeline is drawn like `git log --graph`: newest at the top, and the side branch
// forks out of the main-line role it started during (the "|/" joins that role's dot). While it's still
// running it's unmerged, so it continues past the top of the list.
//
//   * 9c1e2a4 (HEAD -> main) Founder · Branzia
//   | * 4b7d0f3 (louder-design) Lead Software Engineer · Louder Design
//   |/
//   * e21a9b8 Senior Software Engineer · Keylink
type Role = (typeof experience)[number] & { current?: boolean; lane?: string };

const roles = experience as Role[];
const branchAt = roles.findIndex((r) => r.lane === 'branch');

/** A stable 7-character "commit hash" for a role, like `git log --oneline` prints. */
function shortHash(text: string) {
  let h = 0x811c9dc5;
  for (const ch of text) h = Math.imul(h ^ ch.codePointAt(0)!, 0x01000193);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Ref labels git would print next to the commit: HEAD on the newest main-line role, the branch name on a side branch. */
const refFor = (r: Role, i: number) => (r.lane === 'branch' ? slug(r.company) : i === 0 ? 'HEAD -> main' : null);

// Rail geometry, in px from the left of each row: main line at x=12, side branch at x=36, nodes centred at y=13.
const line = 'absolute w-0.5';
const mainX = 'left-[11px]';
const branchX = 'left-[35px]';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 self-start">
          <p className="eyebrow">Experience</p>
          <h2>From agency developer to founder.</h2>
          <p className="lede">
            PHP since March 2012: agency work in Chennai, a decade with one US product company building HIPAA-compliant features, payments and bookings, and a part-time lead role alongside it.
          </p>
          <a href="https://www.linkedin.com/in/visvanathan-d/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
            Full profile on LinkedIn
          </a>
        </div>

        <div>
        <p className="reveal mb-8 font-mono text-[0.8rem] text-hint">
          <span className="text-brand">$</span> git log --graph --oneline <span className="text-ink">career</span>
        </p>
        <ol className="relative">
          {roles.map((r, i) => {
            const first = i === 0;
            const last = i === roles.length - 1;
            const onBranch = i === branchAt;
            return (
              <li key={r.company} className="reveal relative pl-16 sm:pl-18 pb-12 last:pb-0" style={{ ['--i' as string]: i }}>
                {/* Main line: starts at the newest role's node, ends at the first role's node */}
                <span aria-hidden className={`${line} ${mainX} bg-brand/35 ${first ? 'top-[13px] bottom-0' : last ? 'top-0 h-[13px]' : 'top-0 bottom-0'}`} />

                {/* Side branch: runs through every newer row, fading out at the top because it's still going */}
                {branchAt > 0 && i < branchAt && (
                  <span aria-hidden className={`${line} ${branchX} top-0 bottom-0 ${first ? 'bg-linear-to-b from-transparent to-hint/45' : 'bg-hint/45'}`} />
                )}
                {/* The branch's own role: its lane runs down from the node, then curves ("|/") into the main
                    line in the row's bottom gap, meeting it just above the next role's dot, the commit it forked from. */}
                {onBranch && (
                  <>
                    <span aria-hidden className={`${line} ${branchX} top-0 bottom-12 bg-hint/45`} />
                    <svg aria-hidden className="absolute left-0 bottom-0 w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none">
                      <path d="M36 0 C36 30 12 22 12 48" className="stroke-hint/45" strokeWidth="2" />
                    </svg>
                  </>
                )}

                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute top-1.5 size-3.5 rounded-full border-2 ${onBranch ? 'left-[29px] border-hint bg-paper' : 'left-[5px] border-paper'} ${
                    onBranch ? '' : r.current ? 'bg-accent animate-pulse-dot' : 'bg-brand'
                  }`}
                />

                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.78rem] text-hint">
                  <span className="text-brand/80" title="Commit">{shortHash(`${r.company} ${r.date}`)}</span>
                  {refFor(r, i) && (
                    <span className={`px-1.5 rounded border ${onBranch ? 'border-line-strong text-body' : 'border-brand/40 text-brand'}`}>{refFor(r, i)}</span>
                  )}
                  <span>{r.date}</span>
                </p>
                <h3 className="mt-1.5 !text-[1.3rem]">
                  {r.title} <span className="italic text-brand">· {r.company}</span>
                </h3>
                <p className="text-[0.9rem] text-hint mt-0.5">{r.place}</p>
                <p className="mt-3 max-w-[38em]">{r.details}</p>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
