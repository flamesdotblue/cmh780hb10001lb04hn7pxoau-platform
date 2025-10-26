import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const FooterCTA = () => {
  return (
    <section id="cta" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_40%)]" />
          <div className="relative grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">Ready to strengthen alumni relationships?</h3>
              <p className="mt-2 text-slate-300">Launch a secure, centralized platform for data, communication, events, mentorship, and fundraising. Start with a guided demo.</p>
              <ul className="mt-4 text-sm text-slate-300 list-disc pl-5 space-y-1">
                <li>Centralized alumni management</li>
                <li>Engagement tools for events and campaigns</li>
                <li>Mentorship and career tracking</li>
                <li>Privacy-first and secure by design</li>
              </ul>
            </div>
            <form className="relative grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required name="name" placeholder="Your name" className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400/40" />
                <input type="email" required name="email" placeholder="Work email" className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400/40" />
              </div>
              <input type="text" name="institution" placeholder="Institution / Organization" className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400/40" />
              <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-4 py-2 font-semibold text-slate-900 shadow-lg shadow-emerald-500/20">
                Request Demo <Mail className="h-4 w-4" />
              </button>
              <p className="text-xs text-slate-400">By requesting a demo, you agree to our terms and acknowledge our privacy policy.</p>
            </form>
          </div>
        </div>
        <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#stakeholders" className="hover:text-white">Stakeholders</a>
            <a href="#" className="hover:text-white inline-flex items-center gap-1">Contact <ArrowRight className="h-3.5 w-3.5" /></a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterCTA;
