import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Search, Flame, SlidersHorizontal, Heart, Tag } from 'lucide-react';
import { events, charityEvents, sponsors } from '../data/mockData';

const difficultyColors = {
  Easy: 'bg-green-50 text-green-700',
  Intermediate: 'bg-blue-50 text-blue-700',
  Hard: 'bg-orange-50 text-orange-700',
  'Very Hard': 'bg-red-50 text-red-700',
  Extreme: 'bg-purple-50 text-purple-700',
};

const charityColors = {
  pink: { bg: 'bg-pink-50', text: 'text-pink-700', bar: 'bg-pink-400', badge: 'bg-pink-100 text-pink-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-400', badge: 'bg-blue-100 text-blue-700' },
  green: { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-400', badge: 'bg-green-100 text-green-700' },
};

const sportCategories = [
  { label: 'All',           emoji: '🏅' },
  { label: 'Marathon',      emoji: '🏃' },
  { label: 'Triathlon',     emoji: '🏊' },
  { label: 'HYROX',         emoji: '🏋️' },
  { label: 'Skiing',        emoji: '⛷️' },
  { label: 'Rowing',        emoji: '🚣' },
  { label: 'Cycling',       emoji: '🚴' },
  { label: 'Swimming',      emoji: '🏊' },
  { label: 'Trail Running', emoji: '🏔️' },
  { label: 'CrossFit',      emoji: '💪' },
  { label: 'Obstacle Race', emoji: '🧗' },
  { label: 'Charity',       emoji: '❤️' },
];

const DATE_RANGES = [
  { key: 'any',   label: 'Any time' },
  { key: 'week',  label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: '3mo',   label: 'Next 3 months' },
  { key: 'year',  label: 'This year' },
];

function getRangeDates(key) {
  const today = new Date();
  const fmt = (d) => d.toISOString().split('T')[0];
  switch (key) {
    case 'week': {
      const end = new Date(today); end.setDate(today.getDate() + 7);
      return { from: fmt(today), to: fmt(end) };
    }
    case 'month': {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end   = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { from: fmt(start), to: fmt(end) };
    }
    case '3mo': {
      const end = new Date(today); end.setMonth(today.getMonth() + 3);
      return { from: fmt(today), to: fmt(end) };
    }
    case 'year':
      return { from: fmt(new Date(today.getFullYear(), 0, 1)), to: fmt(new Date(today.getFullYear(), 11, 31)) };
    default:
      return { from: '', to: '' };
  }
}

function SponsorCard({ sponsor }) {
  const [copied, setCopied] = useState(false);
  function copyCode() {
    navigator.clipboard.writeText(sponsor.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className={`bg-gradient-to-br ${sponsor.color} border border-gray-100 rounded-2xl p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <img src={sponsor.logo} alt={sponsor.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-900 text-sm">{sponsor.name}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/60 ${sponsor.accent}`}>{sponsor.category}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{sponsor.tagline}</p>
        </div>
      </div>
      <div className="bg-white/70 rounded-xl p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">{sponsor.deal}</p>
        <button onClick={copyCode} className="flex items-center gap-2 text-xs font-mono bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors w-full justify-between">
          <span className={sponsor.accent}>{sponsor.code}</span>
          <span className="text-gray-400">{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [selectedSport, setSelectedSport] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedRange, setSelectedRange] = useState('any');
  const [dateOpen, setDateOpen] = useState(false);

  const showCharity = selectedSport === 'All' || selectedSport === 'Charity';
  const showRegular = selectedSport !== 'Charity';

  const { from: dateFrom, to: dateTo } = getRangeDates(selectedRange);
  const dateActive = selectedRange !== 'any';

  const filtered = events.filter((e) => {
    if (selectedSport === 'Charity') return false;
    const matchSport = selectedSport === 'All' || e.sport === selectedSport;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !dateFrom || e.date >= dateFrom;
    const matchTo = !dateTo || e.date <= dateTo;
    return matchSport && matchSearch && matchFrom && matchTo;
  });

  const spotsPercent = (e) => Math.round((e.registered / e.slots) * 100);

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-x-hidden bg-gray-900" style={{ minHeight: 320 }}>
        <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-gray-900" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24 text-center">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">Find · Register · Compete</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">Your next challenge<br />starts here</h1>
          <p className="text-white/60 text-base mb-10">Marathons, triathlons, HYROX, skiing and more — worldwide</p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl flex items-center">
              <div className="flex-1 flex items-center gap-3 px-5 py-4">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input type="text" placeholder="Search events, sports, locations…" value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent" />
              </div>
              <div className="border-l border-gray-100 px-4 py-4">
                <button
                  onClick={() => setDateOpen(!dateOpen)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${dateActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
                >
                  <Calendar className="w-4 h-4" />
                  {dateActive ? DATE_RANGES.find(r => r.key === selectedRange)?.label : 'Dates'}
                </button>
              </div>
              <div className="pr-3">
                <button className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">Search</button>
              </div>
            </div>

            {/* Date range chips — in-flow, never clipped */}
            {dateOpen && (
              <div className="flex gap-2 flex-wrap justify-center mt-3">
                {DATE_RANGES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedRange(key); setDateOpen(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedRange === key
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Sport category pills ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto py-0 no-scrollbar">
            {sportCategories.map(({ label, emoji }) => {
              const active = selectedSport === label;
              return (
                <button key={label} onClick={() => setSelectedSport(label)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-4 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${active ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'}`}>
                  <span className="text-2xl">{emoji}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ─── Charity Events Section ──────────────────────────────── */}
        {showCharity && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Charity Events</h2>
                <p className="text-xs text-gray-500">Race for a cause — 100% of proceeds go to charity</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {charityEvents.map((event) => {
                const cc = charityColors[event.charityColor] || charityColors.pink;
                const raisedPct = Math.round((event.charityRaised / event.charityGoal) * 100);
                return (
                  <Link key={event.id} to={`/events/${event.id}`} className="block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-44 overflow-hidden">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cc.badge} flex items-center gap-1`}>
                          <Heart className="w-3 h-3 fill-current" /> {event.charityName}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                          {event.currency} {event.price}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 leading-snug text-[15px]">{event.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                      </div>
                      {/* Fundraising bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={`font-semibold ${cc.text}`}>€{(event.charityRaised / 1000).toFixed(0)}k raised</span>
                          <span className="text-gray-400">Goal: €{(event.charityGoal / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cc.bar}`} style={{ width: `${raisedPct}%` }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{raisedPct}% of goal reached</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Regular Events ───────────────────────────────────────── */}
        {showRegular && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filtered.length}</span> events found
                {selectedSport !== 'All' && <span className="ml-1">in <span className="font-medium">{selectedSport}</span></span>}
              </p>
              <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filtered.map((event) => {
                const pct = spotsPercent(event);
                const almostFull = pct > 88;
                return (
                  <Link key={event.id} to={`/events/${event.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="relative h-52 overflow-hidden">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">{event.sport}</span>
                      </div>
                      {almostFull && (
                        <div className="absolute top-3 right-3">
                          <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                            <Flame className="w-3 h-3" /> Almost full
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${difficultyColors[event.difficulty]}`}>{event.difficulty}</span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm">{event.currency} {event.price}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 leading-snug text-[15px]">{event.name}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                          <span>{event.registered.toLocaleString()} registered</span>
                          <span className={almostFull ? 'text-red-500 font-medium' : ''}>{pct}% full</span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-red-400' : pct > 70 ? 'bg-orange-400' : 'bg-gray-900'}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-24 text-gray-400">
                <p className="text-5xl mb-4">🏅</p>
                <p className="text-lg font-semibold text-gray-600 mb-1">No events found</p>
                <p className="text-sm">Try a different sport, clear your dates, or search something else</p>
              </div>
            )}
          </>
        )}

        {/* ─── Sponsors Section ─────────────────────────────────────── */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
              <Tag className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Partner Brands</h2>
              <p className="text-xs text-gray-500">Exclusive deals for Sporvy members</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sponsors.map((s) => <SponsorCard key={s.id} sponsor={s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
