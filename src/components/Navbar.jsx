import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, BarChart2, Menu, X, User, LogOut, Settings, Trophy, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { user } from '../data/mockData';

function SporvyMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="11" r="3" fill="#84CC16" opacity="0.9" />
      <circle cx="15" cy="11" r="3" fill="#84CC16" />
      <path d="M10 11 Q11 7 14 9" stroke="#84CC16" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 9 L20 11 L18 13" stroke="#84CC16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const navLinks = [
  { to: '/', label: 'Events' },
  { to: '/groups', label: 'Groups' },
  { to: '/community', label: 'Community' },
  { to: '/dashboard', label: 'Progress' },
];

const dropdownItems = [
  { icon: User, label: 'My Profile', sub: user.location },
  { icon: Trophy, label: 'My Events', to: '/' },
  { icon: Users, label: 'My Groups', to: '/groups' },
  { icon: BarChart2, label: 'Training Progress', to: '/dashboard' },
  null,
  { icon: Heart, label: 'Saved Events' },
  { icon: Settings, label: 'Account Settings' },
  null,
  { icon: LogOut, label: 'Log out', danger: true },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-[#111827] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gray-800 transition-colors">
              <SporvyMark />
            </div>
            <span className="text-[20px] font-bold tracking-tight text-[#111827]">Sporvy</span>
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden sm:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors rounded-full ${
                    active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-lime-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Host CTA — desktop */}
            <Link
              to="/host-event"
              className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              Host an event
            </Link>

            {/* Profile button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2.5 pl-3 pr-2 py-2 rounded-full border transition-all ${
                  dropdownOpen
                    ? 'border-gray-300 shadow-md bg-white'
                    : 'border-gray-200 hover:shadow-md bg-white'
                }`}
              >
                <Menu className="w-4 h-4 text-gray-600" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.location}</p>
                    </div>
                  </div>

                  {/* Sport badges */}
                  <div className="px-4 py-2.5 border-b border-gray-50">
                    <div className="flex flex-wrap gap-1">
                      {user.sports.map((s) => (
                        <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nav items */}
                  {dropdownItems.map((item, i) => {
                    if (item === null) {
                      return <div key={i} className="my-1 border-t border-gray-50" />;
                    }
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setDropdownOpen(false);
                          if (item.to) navigate(item.to);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                          item.danger
                            ? 'text-red-500 hover:bg-red-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 rounded-lg text-gray-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-1 border-t border-gray-50 pt-3">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium ${
                  location.pathname === to
                    ? 'bg-lime-50 text-[#111827] font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            ))}
            {/* Mobile user */}
            <div className="flex items-center gap-3 px-4 pt-3 border-t border-gray-50 mt-2">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400">{user.location}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
