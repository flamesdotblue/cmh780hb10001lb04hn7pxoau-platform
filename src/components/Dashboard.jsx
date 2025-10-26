import React, { useEffect, useMemo, useState } from 'react';
import { Users, Calendar, Shield, Upload, Download, PlusCircle, Trash2, Pencil, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';
import { loadAll, saveAlumni, saveEvents, upsertAlumni, upsertEvent, removeAlumni, removeEvent, loadUser, setUserProfileVisibility } from '../lib/storage';
import { toCSV, fromCSV } from '../lib/csv';

const TabButton = ({ active, onClick, Icon, children }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition ${active ? 'border-emerald-400/40 bg-emerald-400/10 text-white' : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'}`}
  >
    <Icon className="h-4 w-4" /> {children}
  </button>
);

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
    <div className="mt-1 text-2xl font-bold">{value}</div>
  </div>
);

const emptyAlumni = { id: '', name: '', email: '', gradYear: '', program: '', employer: '', skills: '', public: true };
const emptyEvent = { id: '', title: '', date: '', location: '', capacity: '', attendees: [] };

const Dashboard = ({ user }) => {
  const [{ alumni, events }, setData] = useState({ alumni: [], events: [] });
  const [tab, setTab] = useState('overview');
  const [alumniForm, setAlumniForm] = useState(emptyAlumni);
  const [eventForm, setEventForm] = useState(emptyEvent);

  useEffect(() => {
    const { alumni: a, events: e } = loadAll();
    setData({ alumni: a, events: e });
  }, []);

  const isAdmin = user.role === 'Admin';
  const isAlumni = user.role === 'Alumni';

  const myProfile = useMemo(() => alumni.find((a) => a.email === user.email), [alumni, user.email]);

  const metrics = useMemo(() => {
    const totalAlumni = alumni.length;
    const publicProfiles = alumni.filter((a) => a.public).length;
    const totalEvents = events.length;
    const totalRSVPs = events.reduce((sum, ev) => sum + (ev.attendees?.length || 0), 0);
    return { totalAlumni, publicProfiles, totalEvents, totalRSVPs };
  }, [alumni, events]);

  const handleAlumniSubmit = (e) => {
    e.preventDefault();
    const record = { ...alumniForm, id: alumniForm.id || crypto.randomUUID(), public: Boolean(alumniForm.public) };
    const next = upsertAlumni(record);
    setData((prev) => ({ ...prev, alumni: next }));
    setAlumniForm(emptyAlumni);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const record = { ...eventForm, id: eventForm.id || crypto.randomUUID(), attendees: eventForm.attendees || [] };
    const next = upsertEvent(record);
    setData((prev) => ({ ...prev, events: next }));
    setEventForm(emptyEvent);
  };

  const onDeleteAlumni = (id) => {
    const next = removeAlumni(id);
    setData((prev) => ({ ...prev, alumni: next }));
  };

  const onDeleteEvent = (id) => {
    const next = removeEvent(id);
    setData((prev) => ({ ...prev, events: next }));
  };

  const exportAlumni = () => {
    const csv = toCSV(alumni, ['name','email','gradYear','program','employer','skills','public']);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'alumni.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importAlumni = async (file) => {
    const text = await file.text();
    const rows = fromCSV(text);
    const mapped = rows.map((r) => ({
      id: crypto.randomUUID(),
      name: r.name || '',
      email: r.email || '',
      gradYear: r.gradYear || '',
      program: r.program || '',
      employer: r.employer || '',
      skills: r.skills || '',
      public: String(r.public).toLowerCase() !== 'false',
    }));
    const next = saveAlumni(mapped);
    setData((prev) => ({ ...prev, alumni: next }));
  };

  const rsvp = (evId, attending) => {
    const { events: current } = loadAll();
    const updated = current.map((ev) => {
      if (ev.id !== evId) return ev;
      const set = new Set(ev.attendees || []);
      if (attending) set.add(user.email); else set.delete(user.email);
      return { ...ev, attendees: Array.from(set) };
    });
    const next = saveEvents(updated);
    setData((prev) => ({ ...prev, events: next }));
  };

  const toggleMyVisibility = (publicFlag) => {
    const next = setUserProfileVisibility(user.email, publicFlag);
    setData((prev) => ({ ...prev, alumni: next }));
  };

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <TabButton active={tab==='overview'} onClick={() => setTab('overview')} Icon={BarChart3}>Overview</TabButton>
          <TabButton active={tab==='alumni'} onClick={() => setTab('alumni')} Icon={Users}>Alumni</TabButton>
          <TabButton active={tab==='events'} onClick={() => setTab('events')} Icon={Calendar}>Events</TabButton>
          <TabButton active={tab==='privacy'} onClick={() => setTab('privacy')} Icon={Shield}>Privacy</TabButton>
        </div>

        {tab === 'overview' && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Total Alumni" value={metrics.totalAlumni} />
            <Stat label="Public Profiles" value={metrics.publicProfiles} />
            <Stat label="Events" value={metrics.totalEvents} />
            <Stat label="Total RSVPs" value={metrics.totalRSVPs} />
          </div>
        )}

        {tab === 'alumni' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">Directory</h3>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 cursor-pointer">
                    <Upload className="h-4 w-4" /> Import CSV
                    <input type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && importAlumni(e.target.files[0])} />
                  </label>
                  <button onClick={exportAlumni} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">
                    <Download className="h-4 w-4" /> Export CSV
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-left text-slate-300">
                    <tr>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Year</th>
                      <th className="px-3 py-2">Program</th>
                      <th className="px-3 py-2">Employer</th>
                      <th className="px-3 py-2">Public</th>
                      {isAdmin && <th className="px-3 py-2 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {alumni.map((a) => (
                      <tr key={a.id} className="border-t border-white/10">
                        <td className="px-3 py-2">{a.name}</td>
                        <td className="px-3 py-2 text-slate-300">{a.email}</td>
                        <td className="px-3 py-2">{a.gradYear}</td>
                        <td className="px-3 py-2">{a.program}</td>
                        <td className="px-3 py-2">{a.employer}</td>
                        <td className="px-3 py-2">{a.public ? 'Yes' : 'No'}</td>
                        {isAdmin && (
                          <td className="px-3 py-2 text-right">
                            <div className="inline-flex gap-2">
                              <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs" onClick={() => setAlumniForm(a)}>
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </button>
                              <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs" onClick={() => onDeleteAlumni(a.id)}>
                                <Trash2 className="h-3.5 w-3.5 text-red-400" /> Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                    {alumni.length === 0 && (
                      <tr>
                        <td className="px-3 py-6 text-center text-slate-400" colSpan={isAdmin ? 7 : 6}>No alumni yet. {isAdmin ? 'Use the form to add or import CSV.' : ''}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">{alumniForm.id ? 'Edit Alumni' : 'Add Alumni'}</h3>
              <form onSubmit={handleAlumniSubmit} className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Full name" value={alumniForm.name} onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })} required />
                <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Email" type="email" value={alumniForm.email} onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })} required />
                <div className="grid grid-cols-2 gap-3">
                  <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Graduation year" value={alumniForm.gradYear} onChange={(e) => setAlumniForm({ ...alumniForm, gradYear: e.target.value })} />
                  <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Program" value={alumniForm.program} onChange={(e) => setAlumniForm({ ...alumniForm, program: e.target.value })} />
                </div>
                <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Employer" value={alumniForm.employer} onChange={(e) => setAlumniForm({ ...alumniForm, employer: e.target.value })} />
                <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Skills (comma-separated)" value={alumniForm.skills} onChange={(e) => setAlumniForm({ ...alumniForm, skills: e.target.value })} />
                <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={!!alumniForm.public} onChange={(e) => setAlumniForm({ ...alumniForm, public: e.target.checked })} /> Public profile
                </label>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-4 py-2 font-semibold text-slate-900">
                  <PlusCircle className="h-4 w-4" /> {alumniForm.id ? 'Save Changes' : 'Add Alumni'}
                </button>
                {alumniForm.id && (
                  <button type="button" onClick={() => setAlumniForm(emptyAlumni)} className="text-xs text-slate-300 underline">Cancel edit</button>
                )}
              </form>
            </div>
          </div>
        )}

        {tab === 'events' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-3">Events</h3>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-left text-slate-300">
                    <tr>
                      <th className="px-3 py-2">Title</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Capacity</th>
                      <th className="px-3 py-2">Attendees</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => {
                      const isAttending = (ev.attendees || []).includes(user.email);
                      const canRSVP = user.role !== 'Admin' && user.role !== 'Employer';
                      return (
                        <tr key={ev.id} className="border-t border-white/10">
                          <td className="px-3 py-2">{ev.title}</td>
                          <td className="px-3 py-2">{ev.date}</td>
                          <td className="px-3 py-2">{ev.location}</td>
                          <td className="px-3 py-2">{ev.capacity || '-'}{ev.capacity && ' seats'}</td>
                          <td className="px-3 py-2">{ev.attendees?.length || 0}</td>
                          <td className="px-3 py-2 text-right">
                            <div className="inline-flex gap-2">
                              {canRSVP && !isAttending && (
                                <button onClick={() => rsvp(ev.id, true)} className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> RSVP
                                </button>
                              )}
                              {canRSVP && isAttending && (
                                <button onClick={() => rsvp(ev.id, false)} className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs">
                                  <XCircle className="h-3.5 w-3.5 text-red-400" /> Cancel
                                </button>
                              )}
                              {isAdmin && (
                                <>
                                  <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs" onClick={() => setEventForm(ev)}>
                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                  </button>
                                  <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 text-xs" onClick={() => onDeleteEvent(ev.id)}>
                                    <Trash2 className="h-3.5 w-3.5 text-red-400" /> Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {events.length === 0 && (
                      <tr>
                        <td className="px-3 py-6 text-center text-slate-400" colSpan={6}>No events yet. {isAdmin ? 'Use the form to create your first event.' : 'Please check back later.'}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {isAdmin && (
              <div>
                <h3 className="text-xl font-semibold mb-3">{eventForm.id ? 'Edit Event' : 'Create Event'}</h3>
                <form onSubmit={handleEventSubmit} className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
                    <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} required />
                  </div>
                  <input className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-emerald-400/40" placeholder="Capacity (optional)" value={eventForm.capacity} onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })} />
                  <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-emerald-500 px-4 py-2 font-semibold text-slate-900">
                    <PlusCircle className="h-4 w-4" /> {eventForm.id ? 'Save Changes' : 'Create Event'}
                  </button>
                  {eventForm.id && (
                    <button type="button" onClick={() => setEventForm(emptyEvent)} className="text-xs text-slate-300 underline">Cancel edit</button>
                  )}
                </form>
              </div>
            )}
          </div>
        )}

        {tab === 'privacy' && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-semibold">Privacy and consent</h3>
                <p className="mt-2 text-sm text-slate-300">Control how your profile is shown in the directory. Admins can view all records for compliance and data quality purposes.</p>
                {isAlumni && (
                  <div className="mt-4">
                    <div className="text-sm text-slate-300">Your profile visibility:</div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-sm">{myProfile?.public ? 'Public' : 'Private'}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => toggleMyVisibility(true)} className={`px-3 py-1 rounded-md text-xs border ${myProfile?.public ? 'bg-emerald-400/20 border-emerald-400/40' : 'bg-white/5 border-white/10'}`}>Public</button>
                        <button onClick={() => toggleMyVisibility(false)} className={`px-3 py-1 rounded-md text-xs border ${!myProfile?.public ? 'bg-emerald-400/20 border-emerald-400/40' : 'bg-white/5 border-white/10'}`}>Private</button>
                      </div>
                    </div>
                    {!myProfile && (
                      <p className="mt-3 text-xs text-yellow-300">Your email was not found in the directory. Ask an admin to add you, or switch to Alumni role after being added.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h4 className="font-semibold">Data handling</h4>
              <ul className="mt-2 text-sm text-slate-300 list-disc pl-5 space-y-1">
                <li>Role-based access ensures least privilege.</li>
                <li>Consent tied to profile visibility flag.</li>
                <li>Audit-ready: edits replace records with versionless demo storage.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
