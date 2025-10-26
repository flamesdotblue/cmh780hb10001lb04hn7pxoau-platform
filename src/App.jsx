import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import AuthGate from './components/AuthGate';
import Dashboard from './components/Dashboard';
import FooterCTA from './components/FooterCTA';
import { loadUser } from './lib/storage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = loadUser();
    if (u) setUser(u);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <Navbar user={user} onLogout={() => setUser(null)} />
      {!user ? (
        <AuthGate onAuthenticated={setUser} />
      ) : (
        <Dashboard user={user} />
      )}
      <FooterCTA />
    </div>
  );
}

export default App;
