import React from 'react';
import { GraduationCap, Users, Building2, Briefcase } from 'lucide-react';

const blocks = [
  {
    icon: GraduationCap,
    title: 'Alumni',
    points: [
      'Update profiles and career progress',
      'Discover events and mentoring opportunities',
      'Control data and privacy preferences',
    ],
  },
  {
    icon: Users,
    title: 'Current Students',
    points: [
      'Find mentors and internships',
      'Access alumni network by skills and industries',
      'Get guidance on career paths',
    ],
  },
  {
    icon: Building2,
    title: 'Faculty & Admins',
    points: [
      'Manage communication and campaigns',
      'Track engagement and event outcomes',
      'Maintain accurate alumni records',
    ],
  },
  {
    icon: Briefcase,
    title: 'Employers & Recruiters',
    points: [
      'Post jobs and internships',
      'Collaborate on projects and talks',
      'Source verified alumni talent',
    ],
  },
];

const Card = ({ Icon, title, points }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-6">
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 text-emerald-300">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <ul className="mt-3 space-y-1 text-sm text-slate-300 list-disc pl-5">
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  </div>
);

const Stakeholders = () => {
  return (
    <section id="stakeholders" className="relative py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold">Relevant stakeholders</h2>
          <p className="mt-3 text-slate-300">Built to benefit the entire academic ecosystem through meaningful alumni engagement.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <Card key={b.title} Icon={b.icon} title={b.title} points={b.points} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stakeholders;
