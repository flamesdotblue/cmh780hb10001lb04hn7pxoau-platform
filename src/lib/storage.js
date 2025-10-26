const KEY_ALUMNI = 'ac_alumni';
const KEY_EVENTS = 'ac_events';
const KEY_USER = 'ac_user';

const seedIfEmpty = () => {
  const existingAlumni = JSON.parse(localStorage.getItem(KEY_ALUMNI) || '[]');
  const existingEvents = JSON.parse(localStorage.getItem(KEY_EVENTS) || '[]');
  if (existingAlumni.length === 0) {
    const seed = [
      { id: crypto.randomUUID(), name: 'Aisha Khan', email: 'aisha.khan@example.com', gradYear: '2018', program: 'Computer Science', employer: 'TechNova', skills: 'React,Node,UX', public: true },
      { id: crypto.randomUUID(), name: 'Carlos Mendes', email: 'carlos.mendes@example.com', gradYear: '2015', program: 'Mechanical Eng', employer: 'AeroWorks', skills: 'CAD,Manufacturing', public: true },
      { id: crypto.randomUUID(), name: 'Maya Patel', email: 'maya.patel@example.com', gradYear: '2020', program: 'Business', employer: 'FinVerse', skills: 'Marketing,Fundraising', public: false },
    ];
    localStorage.setItem(KEY_ALUMNI, JSON.stringify(seed));
  }
  if (existingEvents.length === 0) {
    const seedEv = [
      { id: crypto.randomUUID(), title: 'Alumni Homecoming', date: new Date().toISOString().slice(0,10), location: 'Main Auditorium', capacity: '200', attendees: [] },
      { id: crypto.randomUUID(), title: 'Tech Careers Webinar', date: new Date(Date.now()+86400000*14).toISOString().slice(0,10), location: 'Online', capacity: '500', attendees: [] },
    ];
    localStorage.setItem(KEY_EVENTS, JSON.stringify(seedEv));
  }
};

export const loadUser = () => {
  try {
    const u = JSON.parse(localStorage.getItem(KEY_USER) || 'null');
    return u;
  } catch { return null; }
};

export const saveUser = (user) => {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
};

export const loadAll = () => {
  seedIfEmpty();
  const alumni = JSON.parse(localStorage.getItem(KEY_ALUMNI) || '[]');
  const events = JSON.parse(localStorage.getItem(KEY_EVENTS) || '[]');
  return { alumni, events };
};

export const saveAlumni = (arr) => {
  localStorage.setItem(KEY_ALUMNI, JSON.stringify(arr));
  return arr;
};

export const saveEvents = (arr) => {
  localStorage.setItem(KEY_EVENTS, JSON.stringify(arr));
  return arr;
};

export const upsertAlumni = (record) => {
  const { alumni } = loadAll();
  const idx = alumni.findIndex((a) => a.id === record.id);
  if (idx >= 0) alumni[idx] = record; else alumni.unshift(record);
  return saveAlumni(alumni);
};

export const removeAlumni = (id) => {
  const { alumni } = loadAll();
  const next = alumni.filter((a) => a.id !== id);
  return saveAlumni(next);
};

export const upsertEvent = (record) => {
  const { events } = loadAll();
  const idx = events.findIndex((e) => e.id === record.id);
  if (idx >= 0) events[idx] = record; else events.unshift(record);
  return saveEvents(events);
};

export const removeEvent = (id) => {
  const { events } = loadAll();
  const next = events.filter((e) => e.id !== id);
  return saveEvents(next);
};

export const setUserProfileVisibility = (email, publicFlag) => {
  const { alumni } = loadAll();
  const next = alumni.map((a) => a.email === email ? { ...a, public: !!publicFlag } : a);
  return saveAlumni(next);
};
