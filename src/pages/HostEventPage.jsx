import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Shield, FileText, AlertCircle, Upload } from 'lucide-react';

const sports = ['Marathon', 'Triathlon', 'HYROX', 'Skiing', 'Rowing', 'Cycling', 'Trail Running', 'CrossFit', 'Swimming', 'Obstacle Race', 'Other'];
const steps = ['Event Details', 'Credentials', 'Documents', 'Review'];

export default function HostEventPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', sport: '', date: '', location: '', description: '', slots: '', price: '',
    orgName: '', orgWebsite: '', experience: '', insurance: false, permit: false, medical: false,
    docs: [],
  });

  function update(key, val) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  const approvalChecklist = [
    { icon: Shield, label: 'Liability Insurance', desc: 'Minimum €5M public liability cover required', checked: form.insurance },
    { icon: FileText, label: 'Event Permit', desc: 'Local authority permit for the route/venue', checked: form.permit },
    { icon: AlertCircle, label: 'Medical Team', desc: 'Qualified first aid confirmed for the event day', checked: form.medical },
  ];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Clock className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Application submitted!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for submitting <strong>{form.name}</strong>. Our team will review your application and verify all credentials within <strong>5–7 business days</strong>.
        </p>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 text-left">
          <p className="text-sm font-semibold text-gray-900 mb-4">What happens next</p>
          <div className="space-y-4">
            {[
              { step: '1', label: 'Document review', desc: 'Our compliance team checks your insurance, permits, and credentials.', status: 'In progress', color: 'text-amber-500' },
              { step: '2', label: 'Credential verification', desc: 'We verify your organisation and event history.', status: 'Pending', color: 'text-gray-400' },
              { step: '3', label: 'Safety assessment', desc: 'Course/venue safety assessment completed.', status: 'Pending', color: 'text-gray-400' },
              { step: '4', label: 'Approval & publish', desc: 'Once approved, your event goes live on AthleteHub.', status: 'Pending', color: 'text-gray-400' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-500">{item.step}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-left mb-6">
          <p className="text-sm font-medium text-amber-800 mb-1">Important</p>
          <p className="text-xs text-amber-700">Your event will NOT be visible to athletes until our review is complete. We take athlete safety and event legitimacy very seriously. Approval is not guaranteed.</p>
        </div>

        <button onClick={() => navigate('/')} className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Host an Event</h1>
        <p className="text-sm text-gray-500">All events go through our approval process before going live</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-shrink-0">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all ${i === step ? 'bg-gray-900 text-white' : i < step ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-4 h-px bg-gray-200 mx-0.5" />}
          </div>
        ))}
      </div>

      {/* Step 0: Event Details */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Event name *</label>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Alpine Ultra Challenge 2026"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sport *</label>
            <select value={form.sport} onChange={(e) => update('sport', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white">
              <option value="">Select sport</option>
              {sports.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
              <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Max participants *</label>
              <input type="number" value={form.slots} onChange={(e) => update('slots', e.target.value)} placeholder="500"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
            <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="City, Country"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Entry fee (EUR)</label>
            <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="50"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} placeholder="Tell athletes what to expect..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
          </div>
          <button disabled={!form.name || !form.sport || !form.date || !form.location} onClick={() => setStep(1)}
            className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1: Credentials */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-semibold mb-1">Why we verify credentials</p>
            <p className="text-xs text-amber-700">AthleteHub is responsible for the safety of every athlete. We verify every event organiser before publishing to protect our community.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation / Club name *</label>
            <input value={form.orgName} onChange={(e) => update('orgName', e.target.value)} placeholder="e.g. Berlin Sports Events GmbH"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation website</label>
            <input value={form.orgWebsite} onChange={(e) => update('orgWebsite', e.target.value)} placeholder="https://yourevent.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous events organised</label>
            <textarea value={form.experience} onChange={(e) => update('experience', e.target.value)} rows={3} placeholder="List any events you have organised previously, with approximate participant numbers..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
          </div>
          <div className="space-y-3">
            {approvalChecklist.map(({ icon: Icon, label, desc, checked }, i) => {
              const keys = ['insurance', 'permit', 'medical'];
              return (
                <label key={label} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${checked ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="checkbox" checked={checked} onChange={(e) => update(keys[i], e.target.checked)} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
            <button disabled={!form.orgName} onClick={() => setStep(2)}
              className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Documents */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Upload supporting documents. All documents are reviewed by our compliance team and kept confidential.</p>
          {[
            { label: 'Liability Insurance Certificate', required: true, hint: 'PDF, max 10MB' },
            { label: 'Local Authority Event Permit', required: true, hint: 'PDF or image' },
            { label: 'Medical Team Confirmation Letter', required: false, hint: 'Optional but recommended' },
            { label: 'Course/Venue Map', required: false, hint: 'PDF, image, or GPX file' },
          ].map(({ label, required, hint }) => (
            <div key={label} className="border-2 border-dashed border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{label} {required && <span className="text-red-500">*</span>}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{hint}</p>
                </div>
                <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">Upload</button>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Document security</p>
            Documents are encrypted and only accessible to our compliance team. They are never shared with other users.
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50">
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Event</p>
              <p className="font-semibold text-gray-900">{form.name}</p>
              <p className="text-sm text-gray-500">{form.sport} · {form.location}</p>
              {form.date && <p className="text-sm text-gray-500">{new Date(form.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Organiser</p>
              <p className="font-semibold text-gray-900">{form.orgName || '—'}</p>
              {form.orgWebsite && <p className="text-sm text-gray-500">{form.orgWebsite}</p>}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Compliance</p>
              <div className="space-y-1.5">
                {approvalChecklist.map(({ label, checked }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${checked ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {checked && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={checked ? 'text-gray-700' : 'text-gray-400'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700">
            By submitting, you confirm all information is accurate and agree to AthleteHub's Event Host Terms & Conditions. Your event will not go live until approved.
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={() => setSubmitted(true)} className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
              Submit for Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
