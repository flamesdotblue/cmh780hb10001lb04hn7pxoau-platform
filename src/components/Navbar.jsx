import React from 'react';
import { GraduationCap, LogOut } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
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
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-slate-300">{user.name} · {user.role}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('ac_user');
                    onLogout?.();
                  }}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <span className="text-slate-300">Welcome</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
