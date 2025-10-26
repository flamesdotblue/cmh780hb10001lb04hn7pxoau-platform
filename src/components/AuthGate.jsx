import React, { useState } from 'react';
import { User, ShieldCheck } from 'lucide-react';
import { saveUser } from '../lib/storage';

const roles = ['Alumni', 'Student', 'Admin', 'Employer'];

const AuthGate = ({ onAuthenticated }) => {
  const [form, setForm] = useState({ name: '', email: '', role: roles[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { ...form, id: crypto.randomUUID() };
    saveUser(user);
    onAuthenticated?.(user);
  };

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_40%)]" />
          <div className="relative grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Role-based access
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-bold">Sign in to your AlumniConnect workspace</h1>
              <p className="mt-2 text-slate-300">Choose your role to access tailored tools for alumni data, events, mentorship, and outreach.</p>
              <ul className="mt-4 text-sm text-slate-300 list-disc pl-5 space-y-1">
                <li>Alumni: update profile, privacy, RSVP events</li>
                <li>Admin: manage alumni, events, imports/exports</li>
                <li>Student: find mentors and events</li>
                <li>Employer: post and view opportunities</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400/40"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400/40"
                />
              </div>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-4 py-2 font-semibold text-slate-900 shadow-lg shadow-emerald-500/20">
                <User className="h-4 w-4" /> Continue
              </button>
              <p className="text-xs text-slate-400">No password required for this demo. Data persists locally in your browser.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthGate;
