import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Zap, Mountain, ChevronRight, Calendar, Flame,
  Users, Heart, Moon, Activity, Award, Trophy, Target,
} from 'lucide-react';
import { activityData, user, events, groups, healthMetrics } from '../data/mockData';
import { useApp } from '../context/AppContext';

const TABS = ['Training', 'Health', 'Achievements'];

function StatCard({ icon: Icon, label, value, unit, sub, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-3">
        <Icon className={`w-3.5 h-3.5 ${color || ''}`} />
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg px-3 py-2 text-xs">
        <p className="text-gray-400 mb-0.5">{label}</p>
        <p className="font-semibold text-gray-900">{payload[0].value} {payload[0].name === 'km' ? 'km' : payload[0].name}</p>
      </div>
    );
  }
  return null;
};

function HealthRing({ value, max, label, color, size = 56 }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${pct} 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">{value}</div>
      </div>
      <p className="text-xs text-gray-500 text-center">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { joinedGroups } = useApp();
  const [activeTab, setActiveTab] = useState('Training');
  const { stats, weeklyKm, monthlyKm, recentActivities, upcomingEvents } = activityData;
  const { current: health, sleep, achievements, eventHistory } = healthMetrics;
  const weekPct = Math.min(Math.round((stats.weeklyDone / stats.weeklyGoal) * 100), 100);
  const myGroups = groups.filter((g) => joinedGroups.has(g.id));

  const radarData = [
    { subject: 'Endurance', A: 78 },
    { subject: 'Speed', A: 65 },
    { subject: 'Strength', A: 55 },
    { subject: 'Recovery', A: health.recoveryScore },
    { subject: 'Consistency', A: 82 },
    { subject: 'Nutrition', A: 70 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Progress</h1>
          <p className="text-sm text-gray-500">Last updated today · {user.name}</p>
        </div>
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── TRAINING TAB ────────────────────────────────────────── */}
      {activeTab === 'Training' && (
        <>
          {/* Weekly goal */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">WEEKLY GOAL</p>
                <p className="text-3xl font-semibold">{stats.weeklyDone} <span className="text-lg font-normal text-gray-400">/ {stats.weeklyGoal} km</span></p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#84CC16" strokeWidth="2.5"
                    strokeDasharray={`${weekPct} 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{weekPct}%</div>
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-lime-400 rounded-full transition-all" style={{ width: `${weekPct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {stats.weeklyDone > stats.weeklyGoal ? `${stats.weeklyDone - stats.weeklyGoal} km above goal — great week!` : `${stats.weeklyGoal - stats.weeklyDone} km to reach your weekly goal`}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={TrendingUp} label="Total this month" value={stats.totalKm} unit="km" sub={`${stats.totalRuns} runs`} />
            <StatCard icon={Zap} label="Avg pace" value={stats.avgPace} unit="/km" sub="this month" />
            <StatCard icon={Mountain} label="Elevation" value={stats.elevationGain} unit="m" sub="this month" />
            <StatCard icon={Flame} label="Longest run" value={stats.longestRun} unit="km" sub="all time" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">This week</h2>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weeklyKm} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="km" fill="#111827" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">This month</h2>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={monthlyKm}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111827" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="km" stroke="#111827" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Upcoming events</h2>
              <div className="space-y-3">
                {upcomingEvents.map((ue) => {
                  const event = events.find((e) => e.id === ue.eventId);
                  if (!event) return null;
                  const daysUntil = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24));
                  const groupForEvent = myGroups.find((g) => g.targetEventId === event.id);
                  return (
                    <Link key={ue.eventId} to={`/events/${ue.eventId}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <img src={event.image} alt={event.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{event.name}</p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar className="w-3 h-3" />{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          {groupForEvent && <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><Users className="w-3 h-3" />{groupForEvent.name}</span>}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className={`text-sm font-semibold ${daysUntil <= 30 ? 'text-orange-500' : 'text-gray-900'}`}>{daysUntil <= 0 ? 'Today!' : `${daysUntil}d`}</p>
                        <p className="text-xs text-gray-400">to go</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* My Groups */}
          {myGroups.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">My Training Groups</h2>
                <Link to="/groups" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Manage →</Link>
              </div>
              <div className="space-y-3">
                {myGroups.map((g) => {
                  const targetEvent = events.find((e) => e.id === g.targetEventId);
                  return (
                    <div key={g.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100">
                      <img src={g.image} alt={g.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{g.name}</p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Users className="w-3 h-3" />{g.members}/{g.maxMembers}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Zap className="w-3 h-3" />{g.avgPace}</span>
                        </div>
                        {targetEvent && <p className="text-xs text-gray-400 mt-0.5 truncate">For: {targetEvent.name}</p>}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xs text-gray-500 mb-1">Next session</p>
                        <p className="text-xs font-medium text-gray-800 max-w-[100px] text-right leading-tight">{g.upcomingSession.split('–')[0]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent activities</h2>
            <div className="space-y-1">
              {recentActivities.map((act, i) => (
                <div key={act.id} className={`flex items-center gap-4 py-3 ${i < recentActivities.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{act.type}</p>
                    <p className="text-xs text-gray-400">{new Date(act.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-right">
                    <div><p className="text-sm font-semibold text-gray-900">{act.distance} km</p><p className="text-xs text-gray-400">distance</p></div>
                    <div><p className="text-sm font-semibold text-gray-900">{act.pace}</p><p className="text-xs text-gray-400">pace</p></div>
                    <div><p className="text-sm font-semibold text-gray-900">{act.heartRate}</p><p className="text-xs text-gray-400">bpm</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── HEALTH TAB ──────────────────────────────────────────── */}
      {activeTab === 'Health' && (
        <>
          {/* Recovery score hero */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">TODAY'S RECOVERY</p>
                <p className="text-5xl font-bold mb-1">{health.recoveryScore}<span className="text-2xl text-gray-400">%</span></p>
                <p className="text-sm text-green-400 font-medium">Optimal — go hard today</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <HealthRing value={health.hrv} max={100} label="HRV" color="#4ade80" size={52} />
                <HealthRing value={health.restingHR} max={100} label="Resting HR" color="#f472b6" size={52} />
                <HealthRing value={health.trainingLoad} max={100} label="Load" color="#fb923c" size={52} />
              </div>
            </div>
          </div>

          {/* Health stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Activity} label="VO2 Max" value={health.vo2max} unit="ml/kg/min" sub="Excellent" color="text-blue-500" />
            <StatCard icon={Heart} label="Resting HR" value={health.restingHR} unit="bpm" sub="Athlete range" color="text-red-400" />
            <StatCard icon={Moon} label="Avg sleep" value={health.sleepAvg} unit="hrs" sub="Last 7 days" color="text-indigo-400" />
            <StatCard icon={Target} label="Body fat" value={health.bodyFat} unit="%" sub={`${health.weight} kg`} color="text-green-500" />
          </div>

          {/* Sleep chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Sleep quality — last 7 days</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={sleep} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                  <div className="bg-white border border-gray-100 shadow-sm rounded-lg px-3 py-2 text-xs">
                    <p className="text-gray-400">{label}</p>
                    <p className="font-semibold text-gray-900">{payload[0].value}h · Quality {payload[0].payload.quality}%</p>
                  </div>
                ) : null} cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="hours" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fitness radar */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Fitness profile</h2>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f3f4f6" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Radar name="You" dataKey="A" stroke="#111827" fill="#111827" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Event history */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Race history</h2>
            <div className="space-y-3">
              {eventHistory.map((ev, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                  <div className="text-2xl">{ev.badge}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{ev.name}</p>
                    <p className="text-xs text-gray-400">{new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {ev.sport}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{ev.result}</p>
                    <p className="text-xs text-gray-400">{ev.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── ACHIEVEMENTS TAB ─────────────────────────────────────── */}
      {activeTab === 'Achievements' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 hover:shadow-sm transition-all">
                <div className="text-3xl flex-shrink-0">{ach.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">{ach.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{ach.description}</p>
                  <p className="text-xs text-gray-400">{new Date(ach.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats summary */}
          <div className="bg-gray-900 text-white rounded-2xl p-6">
            <h2 className="text-base font-semibold mb-5">Career stats</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Races completed', value: '4', icon: Trophy },
                { label: 'Total km raced', value: '316', icon: TrendingUp },
                { label: 'Achievements', value: achievements.length, icon: Award },
                { label: 'Groups joined', value: groups.filter(g => [1,2].includes(g.id)).length, icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="text-xs text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
