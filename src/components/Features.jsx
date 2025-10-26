import React from 'react';
import { Users, Calendar, Mail, Shield, Rocket, Database, Target, Handshake } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Centralized Alumni Profiles',
    desc: 'Unified database with contact info, academic records, graduation year, skills, and career updates with privacy controls.',
  },
  {
    icon: Mail,
    title: 'Smart Communication',
    desc: 'Segmented email campaigns, in-app messages, and announcements. Keep alumni engaged beyond informal groups.',
  },
  {
    icon: Calendar,
    title: 'Events & RSVPs',
    desc: 'Plan reunions, webinars, and networking events with ticketing, RSVPs, attendance tracking, and reminders.',
  },
  {
    icon: Users,
    title: 'Mentorship & Networking',
    desc: 'Match alumni with students for mentorship, internships, and job referrals using interest and skill tagging.',
  },
  {
    icon: Handshake,
    title: 'Employer & Recruiter Access',
    desc: 'Verified employer portals for opportunities, internships, and alumni-led hiring pipelines.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    desc: 'Role-based access, consent records, audit trails, and secure file storage to protect alumni data.',
  },
  {
    icon: Target,
    title: 'Fundraising & Campaigns',
    desc: 'Track pledges, donations, cohorts, and campaigns with transparent impact reporting and receipts.',
  },
  {
    icon: Rocket,
    title: 'Fast Onboarding',
    desc: 'CSV imports, API integrations, and SSO. Get institutions live quickly with minimal IT overhead.',
  },
];

const FeatureCard = ({ Icon, title, desc }) => (
  <div className="group relative rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition">
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 text-emerald-300">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-slate-300">{desc}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),rgba(16,185,129,0)_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold">Designed for lasting alumni relationships</h2>
          <p className="mt-3 text-slate-300">Strong community, better outcomes. Engage alumni with the tools that matter for students, faculty, and institutions.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} Icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
