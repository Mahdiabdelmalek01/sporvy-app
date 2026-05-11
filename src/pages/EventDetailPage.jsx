import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, Calendar, Users, ArrowLeft, Hotel, ShoppingBag,
  Check, ChevronRight, Star, Clock, Zap,
  Leaf, Package, ArrowRight, ChevronDown, ChevronUp,
} from 'lucide-react';
import { events, charityEvents, groups, user } from '../data/mockData';
import { useApp } from '../context/AppContext';

const difficultyColors = {
  Easy: 'bg-green-50 text-green-700 border-green-100',
  Intermediate: 'bg-blue-50 text-blue-700 border-blue-100',
  Hard: 'bg-orange-50 text-orange-700 border-orange-100',
  'Very Hard': 'bg-red-50 text-red-700 border-red-100',
  Extreme: 'bg-purple-50 text-purple-700 border-purple-100',
};

const steps = ['Category', 'Hotel', 'Equipment', 'Merch', 'Confirm'];

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { joinedGroups, toggleGroup } = useApp();
  const event = [...events, ...charityEvents].find((e) => e.id === parseInt(id));
  const relatedGroups = groups.filter((g) => g.targetEventId === parseInt(id));

  const [step, setStep] = useState(null);
  const [selections, setSelections] = useState({ category: '', hotel: false, equipment: [], merch: [] });
  const [registered, setRegistered] = useState(user.joinedEvents.includes(parseInt(id)));
  const [scheduleOpen, setScheduleOpen] = useState(false);

  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-400">
        Event not found.
      </div>
    );
  }

  const spotsLeft = event.slots - event.registered;
  const pct = Math.round((event.registered / event.slots) * 100);

  const eqTotal = selections.equipment.reduce((sum, eqId) => {
    const item = event.equipment?.find((e) => e.id === eqId);
    return sum + (item ? item.price : 0);
  }, 0);
  const merchTotal = selections.merch.reduce((sum, mId) => {
    const item = event.merch.find((m) => m.id === mId);
    return sum + (item ? item.price : 0);
  }, 0);
  const total = event.price + (selections.hotel ? event.hotel.price * 3 : 0) + eqTotal + merchTotal;

  function toggleItem(key, itemId) {
    setSelections((prev) => ({
      ...prev,
      [key]: prev[key].includes(itemId)
        ? prev[key].filter((id) => id !== itemId)
        : [...prev[key], itemId],
    }));
  }

  function handleConfirm() {
    setRegistered(true);
    setStep(null);
  }

  // ── Post-registration view ─────────────────────────────────────────────────
  if (registered && step === null) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </button>

        <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-6 text-white">
            <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">{event.sport}</span>
            <h1 className="text-2xl font-bold">{event.name}</h1>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Registered
            </span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-green-800 mb-1">You're all set!</p>
            <p className="text-sm text-green-700">
              Registered for <strong>{event.name}</strong> on {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
              {selections.category && ` Category: ${selections.category}.`}
              {selections.equipment.length > 0 && ` Equipment rental confirmed.`}
              {selections.merch.length > 0 && ` Merch pre-ordered.`}
            </p>
          </div>
        </div>

        {relatedGroups.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Training groups for this event</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGroups.map((g) => {
                const isJoined = joinedGroups.has(g.id);
                const spotsLeft = g.maxMembers - g.members;
                return (
                  <div key={g.id} className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${isJoined ? 'border-gray-900' : 'border-gray-100'}`}>
                    <div onClick={() => navigate('/groups')} className="cursor-pointer p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                      <div className="relative flex-shrink-0">
                        <img src={g.image} alt={g.name} className="w-12 h-12 rounded-lg object-cover" />
                        {isJoined && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.members}/{g.maxMembers} members · {g.level}</p>
                        {isJoined && <p className="text-xs text-green-600 font-medium mt-0.5">You're in this group</p>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => toggleGroup(g.id)}
                        disabled={spotsLeft === 0 && !isJoined}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                          isJoined
                            ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                            : spotsLeft === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {isJoined ? 'Leave group' : spotsLeft === 0 ? 'Group full' : 'Join group'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Registration flow ──────────────────────────────────────────────────────
  if (step !== null) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => setStep(null)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to event
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-shrink-0">
              <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all ${
                i === step ? 'bg-gray-900 text-white scale-110' : i < step ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className="w-4 h-px bg-gray-200 mx-0.5" />}
            </div>
          ))}
        </div>

        {/* Step 0 — Category */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Choose your category</h2>
            <p className="text-sm text-gray-500 mb-6">{event.distances.join(' · ')}</p>
            <div className="space-y-3">
              {event.categories.map((cat) => (
                <button key={cat} onClick={() => setSelections((p) => ({ ...p, category: cat }))}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    selections.category === cat ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}>
                  <span>{cat}</span>
                  {selections.category === cat && <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                </button>
              ))}
            </div>
            <button disabled={!selections.category} onClick={() => setStep(1)}
              className="mt-6 w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 1 — Hotel */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Hotel booking</h2>
            <p className="text-sm text-gray-500 mb-6">Optional — partner hotel near the venue</p>
            <div onClick={() => setSelections((p) => ({ ...p, hotel: !p.hotel }))}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${selections.hotel ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{event.hotel.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">3 nights · Near event venue</p>
                    <p className="text-xs text-gray-400">Breakfast included</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">{event.currency} {event.hotel.price}<span className="font-normal text-gray-400 text-xs">/night</span></p>
                  <p className="text-xs text-gray-400">{event.currency} {event.hotel.price * 3} total</p>
                  {selections.hotel && <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center mt-1 ml-auto"><Check className="w-3 h-3 text-white" /></div>}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">Skip to book independently</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Equipment Rental */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Rent equipment</h2>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100">
                <Leaf className="w-3.5 h-3.5" />
                Eco-friendly — rent instead of buy
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Renting gear you'll use once reduces waste and saves money. All equipment is sanitised and inspected between events.
            </p>
            <div className="space-y-3">
              {(event.equipment || []).map((item) => {
                const selected = selections.equipment.includes(item.id);
                return (
                  <button key={item.id} onClick={() => toggleItem('equipment', item.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selected ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                          {selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Leaf className="w-3 h-3 text-green-500" />
                            <p className="text-xs text-green-600">{item.ecoNote}</p>
                          </div>
                        </div>
                      </div>
                      <span className="flex-shrink-0 text-sm font-bold text-gray-900">{event.currency} {item.price}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {selections.equipment.length > 0 && (
              <p className="text-xs text-gray-500 mt-3 text-center">
                {selections.equipment.length} item{selections.equipment.length > 1 ? 's' : ''} selected · {event.currency} {eqTotal} saved vs buying
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Merch */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Pre-order merch</h2>
            <p className="text-sm text-gray-500 mb-2">Reserve yours to avoid overproduction</p>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100">
                <Leaf className="w-3.5 h-3.5" />
                Pre-ordering reduces event waste
              </div>
            </div>
            <div className="space-y-3">
              {event.merch.map((item) => {
                const selected = selections.merch.includes(item.id);
                return (
                  <button key={item.id} onClick={() => toggleItem('merch', item.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-sm transition-all ${selected ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                        {selected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{event.currency} {item.price}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">Pick up at the event — no shipping needed</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={() => setStep(4)} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Review order <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Confirm */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order summary</h2>
            <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 mb-4">
              <div className="flex justify-between p-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Registration</p>
                  <p className="text-xs text-gray-400">{selections.category}</p>
                </div>
                <span className="font-bold text-gray-900">{event.currency} {event.price}</span>
              </div>
              {selections.hotel && (
                <div className="flex justify-between p-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Hotel</p>
                    <p className="text-xs text-gray-400">{event.hotel.name} · 3 nights</p>
                  </div>
                  <span className="font-bold text-gray-900">{event.currency} {event.hotel.price * 3}</span>
                </div>
              )}
              {selections.equipment.length > 0 && (
                <div className="p-4 text-sm">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-gray-900">Equipment rental</p>
                      <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Leaf className="w-2.5 h-2.5" /> eco</span>
                    </div>
                    <span className="font-bold text-gray-900">{event.currency} {eqTotal}</span>
                  </div>
                  {selections.equipment.map((eqId) => {
                    const item = event.equipment?.find((e) => e.id === eqId);
                    return item ? <p key={eqId} className="text-xs text-gray-400 ml-0">· {item.name}</p> : null;
                  })}
                </div>
              )}
              {selections.merch.length > 0 && (
                <div className="p-4 text-sm">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-900">Merch pre-order</p>
                    <span className="font-bold text-gray-900">{event.currency} {merchTotal}</span>
                  </div>
                  {selections.merch.map((mId) => {
                    const item = event.merch.find((m) => m.id === mId);
                    return item ? <p key={mId} className="text-xs text-gray-400">· {item.name}</p> : null;
                  })}
                </div>
              )}
              <div className="flex justify-between p-4 bg-gray-50">
                <span className="font-bold text-gray-900 text-base">Total</span>
                <span className="font-bold text-gray-900 text-base">{event.currency} {total}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-400 text-center mb-6">
              Demo only — no real payment processed
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
              <button onClick={handleConfirm} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                Confirm Registration
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Event Detail page ──────────────────────────────────────────────────────
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                {event.sport}
              </span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${difficultyColors[event.difficulty]}`}>
                {event.difficulty}
              </span>
              {registered && (
                <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Registered
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{event.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{event.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {event.rating} <span className="text-white/50">({event.reviews.toLocaleString()} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left column ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-3">About this event</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-5">
                {event.highlights?.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gray-600" />
                    </div>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Distances & Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Distances & Categories</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.distances.map((d) => (
                  <span key={d} className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl">{d}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {event.categories.map((c) => (
                  <span key={c} className="bg-gray-50 text-gray-700 text-sm px-3 py-1.5 rounded-lg border border-gray-100">{c}</span>
                ))}
              </div>
            </div>

            {/* Race Schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setScheduleOpen(!scheduleOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg">Race Day Schedule</h2>
                </div>
                {scheduleOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {scheduleOpen && (
                <div className="px-6 pb-6 border-t border-gray-50">
                  <div className="relative mt-4">
                    <div className="absolute left-[68px] top-0 bottom-0 w-px bg-gray-100" />
                    <div className="space-y-4">
                      {event.schedule?.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="w-16 flex-shrink-0 text-xs font-semibold text-gray-400 pt-0.5 text-right">{item.time}</span>
                          <div className="relative z-10 w-3 h-3 rounded-full bg-gray-900 flex-shrink-0 mt-1 ring-2 ring-white" />
                          <p className="text-sm text-gray-700">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Spots availability */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-gray-900 text-lg">Availability</h2>
                <span className={`text-sm font-semibold ${pct > 90 ? 'text-red-500' : 'text-gray-600'}`}>
                  {spotsLeft.toLocaleString()} spots left
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-red-400' : pct > 70 ? 'bg-orange-400' : 'bg-gray-900'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{event.registered.toLocaleString()} registered</span>
                <span>{event.slots.toLocaleString()} total</span>
              </div>
            </div>

            {/* Equipment rental preview */}
            {event.equipment?.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">Equipment Rental</h2>
                    <p className="text-xs text-green-600 font-medium">Eco-friendly · Rent instead of buy</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Rent quality gear for this event only. We sanitise and inspect all equipment between uses — reducing waste and saving you money.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.equipment.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Package className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 leading-tight">{item.name}</p>
                        <p className="text-xs text-green-600 mt-0.5">{item.ecoNote}</p>
                      </div>
                      <span className="flex-shrink-0 text-sm font-bold text-gray-900">{event.currency} {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related groups */}
            {relatedGroups.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900 text-lg">Training groups for this event</h2>
                  <span className="text-xs text-gray-400">{relatedGroups.filter(g => joinedGroups.has(g.id)).length} joined</span>
                </div>
                <div className="space-y-3">
                  {relatedGroups.map((g) => {
                    const isJoined = joinedGroups.has(g.id);
                    const spotsLeft = g.maxMembers - g.members;
                    return (
                      <div key={g.id} className={`rounded-xl border-2 overflow-hidden transition-all ${isJoined ? 'border-gray-900' : 'border-gray-100'}`}>
                        {/* Group row */}
                        <div
                          onClick={() => navigate('/groups')}
                          className="cursor-pointer flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative flex-shrink-0">
                            <img src={g.image} alt={g.name} className="w-12 h-12 rounded-xl object-cover" />
                            {isJoined && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm text-gray-900">{g.name}</p>
                              {isJoined && <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">Joined</span>}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{g.members}/{g.maxMembers} members · {g.level} · avg {g.avgPace}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                        {/* Join/Leave button */}
                        <div className="px-3 pb-3">
                          <button
                            onClick={() => toggleGroup(g.id)}
                            disabled={spotsLeft === 0 && !isJoined}
                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                              isJoined
                                ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                                : spotsLeft === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-gray-800'
                            }`}
                          >
                            {isJoined ? 'Leave group' : spotsLeft === 0 ? 'Group full' : 'Join group'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column: Booking card ───────────────────── */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-gray-900">{event.currency} {event.price}</span>
              </div>
              <p className="text-xs text-gray-400 mb-5">entry fee · excl. hotel & extras</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-50">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(event.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">{event.rating}</span>
                <span className="text-sm text-gray-400">({event.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Info rows */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Hotel className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  Hotel from {event.currency} {event.hotel.price}/night
                </div>
                {event.equipment?.length > 0 && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Leaf className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {event.equipment.length} equipment items to rent
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {event.merch.length} merch items to pre-order
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {spotsLeft.toLocaleString()} spots remaining
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Zap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {event.categories.length} categories available
                </div>
              </div>

              {registered ? (
                <div className="w-full bg-green-50 text-green-700 border border-green-100 py-3.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> You're registered
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setStep(0)}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors mb-3 flex items-center justify-center gap-2"
                  >
                    Register Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-gray-400 text-center">No charge until final confirmation</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
