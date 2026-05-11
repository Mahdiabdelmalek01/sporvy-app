import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Zap, ChevronRight, Check, Search } from 'lucide-react';
import { groups, user, events } from '../data/mockData';
import { useApp } from '../context/AppContext';

const levelColors = {
  Beginner: 'bg-green-50 text-green-700',
  Intermediate: 'bg-blue-50 text-blue-700',
  Advanced: 'bg-orange-50 text-orange-700',
  Elite: 'bg-purple-50 text-purple-700',
};

export default function GroupsPage() {
  const { joinedGroups, toggleGroup } = useApp();
  const [selectedSport, setSelectedSport] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedGroup, setExpandedGroup] = useState(null);

  const sportFilters = ['All', ...Array.from(new Set(groups.map((g) => g.sport)))];

  const myGroups = groups.filter((g) => joinedGroups.has(g.id));

  const filtered = groups.filter((g) => {
    const matchSport = selectedSport === 'All' || g.sport === selectedSport;
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.targetEvent.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Training Groups</h1>
        <p className="text-gray-500 text-sm">Find your crew, train together, race together</p>
      </div>

      {/* My Groups section */}
      {myGroups.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
            My Groups ({myGroups.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myGroups.map((group) => {
              const event = events.find((e) => e.id === group.targetEventId);
              return (
                <div key={group.id} className="bg-white border-2 border-gray-900 rounded-2xl overflow-hidden">
                  <Link to="/community" className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <img src={group.image} alt={group.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <p className="text-xs font-semibold text-green-600">Joined</p>
                      </div>
                      <p className="font-semibold text-sm text-gray-900 leading-tight truncate">{group.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{group.members}/{group.maxMembers} members · {group.sport}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </Link>
                  {event && (
                    <Link
                      to={`/events/${event.id}`}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-t border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <img src={event.image} alt={event.name} className="w-6 h-6 rounded-md object-cover flex-shrink-0" />
                      <p className="text-xs text-gray-600 truncate flex-1">{event.name}</p>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    </Link>
                  )}
                  <div className="px-4 py-2.5 border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {group.upcomingSession}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search groups or events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      {/* Sport Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {sportFilters.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === sport
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* All groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((group) => {
          const joined = joinedGroups.has(group.id);
          const isExpanded = expandedGroup === group.id;
          const spotsLeft = group.maxMembers - group.members;
          const event = events.find((e) => e.id === group.targetEventId);

          return (
            <div
              key={group.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all hover:shadow-sm ${
                joined ? 'border-gray-300' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Top */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={group.image} alt={group.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    {joined && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 leading-tight">{group.name}</h3>
                      <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[group.level] || 'bg-gray-50 text-gray-600'}`}>
                        {group.level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{group.sport} · Led by {group.leader}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {group.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{group.members}/{group.maxMembers}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{group.avgPace}</span>
                  </div>
                  <span className={`text-xs font-medium ${spotsLeft <= 2 ? 'text-red-500' : 'text-gray-400'}`}>
                    {spotsLeft} spots left
                  </span>
                </div>

                {/* Members bar */}
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${joined ? 'bg-green-500' : 'bg-gray-900'}`}
                    style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                  />
                </div>
              </div>

              {/* Target event */}
              {event && (
                <Link
                  to={`/events/${event.id}`}
                  className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-t border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <img src={event.image} alt={event.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Target event</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{event.name}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Link>
              )}

              {/* Expandable info */}
              {isExpanded && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Next session: {group.upcomingSession}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-5 pb-5 pt-3 flex gap-3">
                <button
                  onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                  className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {isExpanded ? 'Show less' : 'View details'}
                </button>
                <button
                  onClick={() => toggleGroup(group.id)}
                  disabled={spotsLeft === 0 && !joined}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    joined
                      ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                      : spotsLeft === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {joined ? (
                    <><Check className="w-4 h-4" /> Joined</>
                  ) : spotsLeft === 0 ? (
                    'Full'
                  ) : (
                    'Join Group'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium mb-1">No groups found</p>
          <p className="text-sm">Try a different sport or search term</p>
        </div>
      )}
    </div>
  );
}
