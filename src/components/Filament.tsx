// FilamentPHP: the tool I reach for on the admin side of a project. Only claims backed by the portfolio
// (LB Blockhead) or by the versions my current projects run on.
import { CodeWindow, Cm, Fn, Kw, Str, Ty } from './Code';
import { WORK_FILTER_EVENT } from '../hooks/workFilter';

const points = [
  {
    title: 'Admin panels and back offices',
    text: 'Resources, forms and tables for the orders, bookings, customers and records a business manages every day, with filters, search and bulk actions built in.',
  },
  {
    title: 'Dashboards that update live',
    text: 'Stats, tables and widgets driven by Livewire, so the screen changes as the data does. LB Blockhead’s room-block and meetings dashboard works this way.',
    link: { label: 'See LB Blockhead', href: '#work', filter: 'filament' },
  },
  {
    title: 'On the current versions',
    text: 'My current projects run on Filament 5 with Livewire 4 and Laravel 13, so new work starts on the latest stack rather than catching up later.',
  },
];

export default function Filament() {
  return (
    <section id="filament" className="section">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="reveal">
            <p className="eyebrow">FilamentPHP</p>
            <h2>The admin side, built with FilamentPHP.</h2>
            <p className="lede">
              Most software I build has two halves: what customers see, and what the business runs on. For the second half I use FilamentPHP, a Laravel-native framework for admin panels and dashboards that are quick to build and easy to change as the business grows.
            </p>
          </div>

          {/* An illustrative table definition (not client code): a live list that refreshes itself. */}
          <CodeWindow title="app/Filament/Resources/Orders/Tables/OrdersTable.php" className="reveal min-w-0" >
            <Kw>public static function</Kw> <Fn>configure</Fn>(<Ty>Table</Ty> $table): <Ty>Table</Ty>
            {'\n{\n    '}
            <Kw>return</Kw> $table
            {'\n        ->'}
            <Fn>columns</Fn>([
            {'\n            '}
            <Ty>TextColumn</Ty>::<Fn>make</Fn>(<Str>'customer.name'</Str>)-&gt;<Fn>searchable</Fn>(),
            {'\n            '}
            <Ty>TextColumn</Ty>::<Fn>make</Fn>(<Str>'total'</Str>)-&gt;<Fn>money</Fn>(<Str>'INR'</Str>),
            {'\n            '}
            <Ty>TextColumn</Ty>::<Fn>make</Fn>(<Str>'status'</Str>)-&gt;<Fn>badge</Fn>(),
            {'\n        ])\n        ->'}
            <Fn>poll</Fn>(<Str>'5s'</Str>); <Cm>// refreshes on its own</Cm>
            {'\n}'}
          </CodeWindow>
        </div>
        <ol className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-12">
          {points.map((p, i) => (
            <li key={p.title} className="reveal card p-7 flex flex-col" style={{ ['--i' as string]: i }}>
              <span className="font-mono text-[0.8rem] text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4">{p.title}</h3>
              <p className="mt-2 text-[0.97rem]">{p.text}</p>
              {p.link && (
                <a
                  href={p.link.href}
                  onClick={() => window.dispatchEvent(new CustomEvent(WORK_FILTER_EVENT, { detail: p.link.filter }))}
                  className="mt-auto pt-5 text-[0.93rem] font-medium text-brand hover:text-brand-deep">
                  {p.link.label} →
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
