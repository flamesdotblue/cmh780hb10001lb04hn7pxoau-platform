import React from 'react';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-500">
              <GraduationCap className="h-5 w-5 text-slate-900" />
            </div>
            <span className="text-lg font-semibold tracking-tight">AlumniConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#stakeholders">Stakeholders</a>
            <a className="hover:text-white" href="#cta">Get Started</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#cta" className="hidden sm:inline-flex items-center rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium hover:bg-white/10 transition">Request Demo</a>
            <a href="#cta" className="inline-flex items-center rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/20">Launch</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
