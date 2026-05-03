import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PixelTrackAuth from './components/PixelTrackAuth';
import MapView from './components/MapView';
import { HUDPanel } from './components/PixelUI';
import PixelWorld from './components/PixelWorld';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ heroes: 0, actions: 0, uptime: '00:00' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        // Dummy stats for now
        setStats({ heroes: 124, actions: 892, uptime: '14:20' });
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-pixelBg">
        <div className="text-pixelGold font-pixel text-2xl animate-pulse">LOADING SYSTEM...</div>
        <div className="w-64 h-4 border-2 border-pixelGold mt-4 p-1">
          <div className="h-full bg-pixelGold animate-[loading_2s_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-pixelBg selection:bg-pixelGold selection:text-black">
      {/* Visual Effects */}
      <div className="crt-overlay" />
      <div className="pixel-noise" />
      <div className="scanline" />

      {/* Top HUD */}
      <header className="h-20 border-b-4 border-black bg-black/40 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-pixelGold flex items-center justify-center pixel-border-gold">
            <span className="text-black font-pixel text-xl font-bold">P</span>
          </div>
          <div>
            <h1 className="text-pixelGold text-lg leading-none m-0">PIXELTRACK v1.0</h1>
            <p className="text-pixelBlue text-[10px] m-0 font-terminal uppercase tracking-widest">Global Hero Surveillance System</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <HUDPanel label="Active Heroes" value={stats.heroes} color="green" />
          <HUDPanel label="Quests Logged" value={stats.actions} color="blue" />
          <HUDPanel label="System Uptime" value={stats.uptime} color="gold" />
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <div className="text-[10px] font-pixel text-pixelGreen leading-none">{user.displayName || 'HERO'}</div>
              <div className="text-[8px] font-pixel text-white/50 mt-1">LVL 99 TRACKER</div>
            </div>
            <img 
              src={user.photos?.[0]?.value || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`} 
              alt="avatar" 
              className="w-10 h-10 border-2 border-pixelGold bg-black"
            />
            <a 
              href={`${import.meta.env.VITE_BACKEND_URL}/auth/logout`}
              className="ml-2 bg-red-900/50 border-2 border-red-500 px-2 py-1 text-[8px] font-pixel text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              EXIT
            </a>
          </div>
        )}
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
        {!user ? (
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 h-full">
            <PixelWorld />
            <div className="flex items-center justify-center bg-pixelBg p-4">
              <PixelTrackAuth onLogin={handleLogin} />
            </div>
          </div>
        ) : (
          <>
            {/* Left side: Map/Game world (7/12 cols) */}
            <div className="col-span-1 md:col-span-8 relative border-r-4 border-black h-full">
              <MapView user={user} />
              {/* Internal Map HUD */}
              <div className="absolute top-4 left-4 z-40 bg-black/80 border-2 border-pixelGreen p-2 pointer-events-none">
                <div className="text-[8px] font-pixel text-pixelGreen">RADAR STATUS: ACTIVE</div>
                <div className="text-[10px] font-terminal text-white">X: 124.5 | Y: -45.2</div>
              </div>
            </div>

            {/* Right side: Panel/Card system (4/12 cols) */}
            <div className="col-span-1 md:col-span-4 flex flex-col bg-black/20 p-4 gap-4 overflow-y-auto custom-scrollbar">
              <MapViewSidebar user={user} />
            </div>
          </>
        )}
      </main>

      {/* Footer / Log Panel */}
      <footer className="h-12 border-t-4 border-black bg-black/60 flex items-center px-4 z-50 overflow-hidden">
        <div className="flex items-center gap-2 text-pixelGreen text-[12px] font-terminal animate-pulse">
          <span className="font-pixel text-[8px]">[LOG]</span>
          <span className="whitespace-nowrap">SYSTEM: HERO_{user?.id?.slice(-4) || 'GUEST'} HAS ENTERED THE SECTOR... BROADCASTING COORDINATES...</span>
        </div>
      </footer>
    </div>
  );
}

// Internal component for the sidebar content
function MapViewSidebar({ user }) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm text-pixelGold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-pixelGold animate-ping"></span>
          ACTIVE SESSION
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-black/40 border-2 border-slate-800">
            <div className="text-[8px] font-pixel text-slate-500 mb-1 uppercase">Packets Sent</div>
            <div className="text-lg font-terminal text-pixelBlue">1,402</div>
          </div>
          <div className="p-3 bg-black/40 border-2 border-slate-800">
            <div className="text-[8px] font-pixel text-slate-500 mb-1 uppercase">Latency</div>
            <div className="text-lg font-terminal text-pixelGreen">14ms</div>
          </div>
        </div>
      </section>

      <section className="bg-pixelGold/10 border-2 border-pixelGold p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10 -rotate-12 translate-x-4 -translate-y-4">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>
        </div>
        <h3 className="font-pixel text-[10px] text-pixelGold mb-2">HERO MISSION</h3>
        <p className="text-sm text-white/80 font-terminal leading-snug">
          Track fellow adventurers across the global realm. Share your path to build the collective map.
        </p>
        <button className="mt-4 w-full bg-pixelGold text-black font-pixel text-[10px] py-2 hover:bg-yellow-400 active:scale-95 transition-all">
          SHARE LOCATION
        </button>
      </section>

      <section>
        <h3 className="font-pixel text-[10px] text-pixelBlue mb-3 uppercase">World Activity</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="text-[12px] font-terminal border-l-2 border-pixelBlue pl-2 py-1 bg-white/5">
              <span className="text-pixelBlue/60 mr-2">12:04:{i}2</span>
              <span className="text-white">User_A moved to [40.7, -74.0]</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
