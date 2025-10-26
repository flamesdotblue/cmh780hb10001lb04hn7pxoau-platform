import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stakeholders from './components/Stakeholders';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <Stakeholders />
      <FooterCTA />
    </div>
  );
}

export default App;
