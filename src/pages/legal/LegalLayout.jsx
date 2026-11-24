import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DRAFT, LAST_UPDATED, OPERATOR } from './legalConfig';

// Legal pages render outside the demo shell: the "all data is simulated"
// banner and the mock user menu describe the prototype, and would be false
// on a page about the real app's real data.

export function Fill({ children }) {
  return (
    <mark className="bg-amber-100 text-amber-900 rounded px-1 font-medium">
      [{children}]
    </mark>
  );
}

// Renders a config value, or a highlighted gap when it has not been filled.
export function Value({ value, label }) {
  return value ? <>{value}</> : <Fill>{label}</Fill>;
}

export function OperatorAddress() {
  return (
    <p className="text-gray-700 leading-relaxed mb-4">
      <Value value={OPERATOR.name} label="Full legal name" /><br />
      <Value value={OPERATOR.street} label="Street and number" /><br />
      <Value value={OPERATOR.city} label="Postcode and city" /><br />
      {OPERATOR.country}<br />
      Email: <a className="text-gray-900 underline" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>
    </p>
  );
}

export function H2({ id, children }) {
  return <h2 id={id} className="text-xl font-semibold text-gray-900 mt-10 mb-3 scroll-mt-24">{children}</h2>;
}

export function H3({ children }) {
  return <h3 className="text-base font-semibold text-gray-900 mt-6 mb-2">{children}</h3>;
}

export function P({ children }) {
  return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>;
}

export function UL({ children }) {
  return <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4 space-y-1">{children}</ul>;
}

export default function LegalLayout({ title, children }) {
  useEffect(() => {
    document.title = `${title} · Sporvy`;
    let robots = null;
    if (DRAFT) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
    }
    return () => {
      document.title = 'Sporvy';
      robots?.remove();
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50">
      {DRAFT && (
        <div className="bg-amber-400 text-amber-950 text-sm text-center py-2 px-4 font-medium">
          Draft, not yet reviewed. This text is not in force.
        </div>
      )}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-[72px] flex items-center">
          <Link to="/" className="text-[20px] font-bold tracking-tight text-[#111827]">Sporvy</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: <Value value={LAST_UPDATED} label="Date" />
        </p>
        <div className="mt-6">{children}</div>
      </main>
      <LegalFooter />
    </div>
  );
}

export function LegalFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
        <span>© Sporvy</span>
        <Link to="/impressum" className="hover:text-gray-900">Impressum</Link>
        <Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gray-900">Terms of Use</Link>
      </div>
    </footer>
  );
}
