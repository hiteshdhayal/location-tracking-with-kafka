import React from 'react';

export default function PixelWorld() {
  return (
    <div className="relative w-full h-full overflow-hidden border-r-4 border-black" style={{ background: 'linear-gradient(to bottom, #5C94FC 0%, #5C94FC 65%, #5AA500 65%, #5AA500 100%)' }}>
      <style>{`
        @keyframes sunBob {
          from { transform: translateY(-8px); }
          to { transform: translateY(8px); }
        }
        @keyframes cloudFloat1 {
          from { transform: translateX(-100px); }
          to { transform: translateX(100vw); }
        }
        @keyframes cloudFloat2 {
          from { transform: translateX(-100px); }
          to { transform: translateX(100vw); }
        }
        @keyframes characterWalk {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(100vw); }
        }
        @keyframes characterWalk2 {
          0% { transform: translateX(-80px); }
          100% { transform: translateX(100vw); }
        }
        @keyframes legLeft {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @keyframes legRight {
          0% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        @keyframes dotPulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>

      {/* HUD Box */}
      <div className="absolute top-5 left-5 bg-black border-2 border-pixelGold p-3 z-10">
        <div className="text-pixelGold text-xs mb-1 font-pixel">▶ PIXELTRACK</div>
        <div className="text-white text-lg font-bold font-terminal tracking-widest">Begin your quest.</div>
      </div>

      {/* Sun */}
      <div className="absolute top-[10%] right-[15%] w-16 h-16 bg-[#FFA500] rounded-full shadow-[0_0_20px_#FFA500]" style={{ animation: 'sunBob 3s ease-in-out infinite alternate' }} />

      {/* Clouds */}
      <div className="absolute top-[10%] z-[2]" style={{ animation: 'cloudFloat1 20s linear infinite' }}>
        <Cloud />
      </div>
      <div className="absolute top-[15%] z-[2]" style={{ animation: 'cloudFloat2 14s linear infinite', animationDelay: '2s' }}>
        <Cloud />
      </div>
      <div className="absolute top-[25%] z-[2]" style={{ animation: 'cloudFloat1 18s linear infinite', animationDelay: '5s' }}>
        <Cloud />
      </div>

      {/* Mountains */}
      <div className="absolute bg-gray-600 z-[1] bottom-[35%] left-[10%] w-[150px] h-[100px]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      <div className="absolute bg-gray-600 z-[1] bottom-[35%] left-[25%] w-[120px] h-[80px] opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      <div className="absolute bg-gray-600 z-[1] bottom-[35%] left-[40%] w-[180px] h-[120px]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />

      {/* Buildings */}
      <Building style={{ left: '15%', bottom: '35%' }} width={40} height={80} />
      <Building style={{ left: '30%', bottom: '35%' }} width={50} height={110} />
      <Building style={{ left: '45%', bottom: '35%' }} width={35} height={65} />

      {/* Ground Line */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] bg-[#92400E]" style={{ backgroundImage: 'linear-gradient(90deg, #78350F 2px, transparent 2px), linear-gradient(0deg, #78350F 2px, transparent 2px)', backgroundSize: '16px 12px' }} />

      {/* Pulse Marker */}
      <div className="absolute bottom-[40%] left-[30%] w-2.5 h-2.5 bg-pixelGold rounded-full" style={{ animation: 'dotPulse 1.5s infinite' }} />

      {/* Characters */}
      <div className="absolute bottom-[38%] z-[5]" style={{ animation: 'characterWalk 8s linear infinite' }}>
        <Character1 />
      </div>
      <div className="absolute bottom-[37%] z-[5]" style={{ animation: 'characterWalk2 11s linear infinite', animationDelay: '3s' }}>
        <Character2 />
      </div>

      {/* Terminal Text Box */}
      <div className="absolute bottom-10 left-5 right-5 bg-black p-3 border border-pixelGreen z-10 h-[60px] overflow-hidden">
        <div className="text-pixelGreen text-sm whitespace-pre-wrap border-r-2 border-pixelGreen w-0" style={{ animation: 'typewriter 4s steps(100) 1s forwards, blink 0.7s infinite' }}>
          SYSTEM: Heroes are gathering on the map. Share your location and watch fellow adventurers move in real time.
        </div>
      </div>
    </div>
  );
}

// Sub-components for Pixel Art
const Cloud = () => (
  <div style={{ position: 'relative', width: 60, height: 20 }}>
    <div style={{ position: 'absolute', top: 8, left: 0, width: 20, height: 12, background: 'white' }} />
    <div style={{ position: 'absolute', top: 4, left: 12, width: 24, height: 16, background: 'white' }} />
    <div style={{ position: 'absolute', top: 8, left: 36, width: 20, height: 12, background: 'white' }} />
    <div style={{ position: 'absolute', top: 0, left: 22, width: 18, height: 12, background: 'white' }} />
  </div>
);

const Building = ({ style, width, height }) => (
  <div style={{ position: 'absolute', width, height, background: '#374151', borderTop: '2px solid #1f2937', ...style }}>
    {/* Lit Windows */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', padding: '8px' }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ width: 8, height: 8, background: '#FCD34D' }} />
      ))}
    </div>
  </div>
);

const Character1 = () => (
  <div style={{ position: 'relative', width: 16, height: 24 }}>
    {/* Head */}
    <div style={{ position: 'absolute', top: 0, left: 2, width: 12, height: 10, background: '#F59E0B' }} />
    {/* Body */}
    <div style={{ position: 'absolute', top: 10, left: 1, width: 14, height: 8, background: '#92400E' }} />
    {/* Legs */}
    <div style={{ position: 'absolute', top: 18, left: 2, width: 5, height: 6, background: '#92400E', animation: 'legLeft 0.4s ease-in-out infinite alternate' }} />
    <div style={{ position: 'absolute', top: 18, left: 9, width: 5, height: 6, background: '#92400E', animation: 'legRight 0.4s ease-in-out infinite alternate' }} />
  </div>
);

const Character2 = () => (
  <div style={{ position: 'relative', width: 16, height: 24 }}>
    {/* Head */}
    <div style={{ position: 'absolute', top: 0, left: 2, width: 12, height: 10, background: '#60A5FA' }} />
    {/* Body */}
    <div style={{ position: 'absolute', top: 10, left: 1, width: 14, height: 8, background: '#1E40AF' }} />
    {/* Legs */}
    <div style={{ position: 'absolute', top: 18, left: 2, width: 5, height: 6, background: '#1E3A8A', animation: 'legLeft 0.4s ease-in-out infinite alternate' }} />
    <div style={{ position: 'absolute', top: 18, left: 9, width: 5, height: 6, background: '#1E3A8A', animation: 'legRight 0.4s ease-in-out infinite alternate' }} />
  </div>
);
