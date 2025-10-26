import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Shield, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live 3D preview enabled
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Centralized Alumni Data & Engagement Platform
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              Move beyond scattered spreadsheets and messaging groups. Unify alumni profiles, communication, events, mentorship, careers, and fundraising in a secure, modern system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-4 py-2 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition">
                Explore Features
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400"/>GDPR-ready controls</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-cyan-400"/>Role-based access</div>
            </div>
          </div>
          <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
            <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
