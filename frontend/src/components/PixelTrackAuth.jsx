import React, { useState, useEffect } from 'react';

/**
 * PixelTrackAuth.jsx
 * A self-contained, pixel-art themed authentication UI.
 */


import { PixelCard, PixelButton } from './PixelUI';

export default function PixelTrackAuth({ onLogin }) {
  return (
    <div className="w-full max-w-md mx-auto animate-[fadeIn_0.5s_ease-out]">
      <PixelCard title="SYSTEM AUTHENTICATION" className="p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-pixelGold mx-auto mb-4 flex items-center justify-center pixel-border-gold animate-bounce">
            <span className="text-black font-pixel text-4xl">?</span>
          </div>
          <h2 className="text-xl text-pixelGold mb-2">IDENTITY REQUIRED</h2>
          <p className="text-sm text-slate-400 font-terminal uppercase tracking-widest">
            You must authenticate to access the global tracking radar.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-black/50 p-4 border-2 border-slate-800">
            <h4 className="font-pixel text-[8px] text-pixelBlue mb-2 uppercase">Protocol: OIDC</h4>
            <p className="text-[12px] text-white/60 font-terminal mb-4">
              Securely sign in using your Google hero credentials.
            </p>
            <PixelButton 
              onClick={onLogin}
              className="w-full py-4 text-sm"
              variant="primary"
            >
              ▶ SIGN IN WITH GOOGLE
            </PixelButton>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="font-pixel text-[8px] text-slate-600">OR</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="text-center">
            <p className="text-[10px] font-pixel text-slate-500 mb-2">GUEST ACCESS</p>
            <button className="text-pixelBlue text-[10px] font-pixel hover:underline decoration-2 underline-offset-4">
              [ REQUEST TEMPORARY TOKEN ]
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-slate-800/50 flex justify-between items-center text-[8px] font-pixel text-slate-600">
          <span>SECURE_LINK: ESTABLISHED</span>
          <span>ENCRYPTION: PIXEL_8BIT</span>
        </div>
      </PixelCard>
      
      <div className="mt-6 text-center">
        <p className="text-[10px] font-pixel text-pixelGreen/40 animate-pulse">
          WAITING FOR HERO...
        </p>
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

const styles = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    fontFamily: "'Courier New', Courier, monospace",
    overflow: 'hidden',
  },
  leftHalf: {
    width: '50%',
    height: '100%',
    background: 'linear-gradient(to bottom, #5C94FC 0%, #5C94FC 65%, #5AA500 65%, #5AA500 100%)',
    position: 'relative',
    borderRight: '4px solid #000',
  },
  rightHalf: {
    width: '50%',
    height: '100%',
    background: '#0a0e1a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  hudBox: {
    position: 'absolute',
    top: 20,
    left: 20,
    background: '#000',
    border: '3px solid #F59E0B',
    padding: '12px 20px',
    zIndex: 10,
  },
  hudLine1: {
    color: '#F59E0B',
    fontSize: '12px',
    marginBottom: '4px',
  },
  hudLine2: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  sun: {
    position: 'absolute',
    top: '10%',
    right: '15%',
    width: '60px',
    height: '60px',
    background: '#FFA500',
    borderRadius: '50%',
    boxShadow: '0 0 20px #FFA500',
    animation: 'sunBob 3s ease-in-out infinite alternate',
  },
  cloudContainer: {
    position: 'absolute',
    top: '10%',
    zIndex: 2,
  },
  mountain: {
    position: 'absolute',
    background: '#4B5563',
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    zIndex: 1,
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '35%',
    background: '#5AA500',
  },
  brickStrip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '24px',
    background: '#92400E',
    backgroundImage: `
      linear-gradient(90deg, #78350F 2px, transparent 2px),
      linear-gradient(0deg, #78350F 2px, transparent 2px)
    `,
    backgroundSize: '16px 12px',
  },
  charWrapper: {
    position: 'absolute',
    bottom: '38%',
    zIndex: 5,
  },
  dotPulse: {
    position: 'absolute',
    bottom: '40%',
    left: '30%',
    width: '10px',
    height: '10px',
    background: '#F59E0B',
    borderRadius: '50%',
    animation: 'dotPulse 1.5s infinite',
  },
  terminalContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    background: '#000',
    padding: '12px',
    border: '1px solid #5AA500',
    zIndex: 10,
    height: '60px',
  },
  terminalText: {
    color: '#22c55e',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    borderRight: '2px solid #22c55e',
    animation: 'typewriter 4s steps(100) 1s forwards, blink 0.7s infinite',
    width: '0',
  },
  authCard: {
    background: '#111827',
    border: '2px solid #F59E0B',
    padding: '40px',
    width: '400px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
  },
  authTitle: {
    margin: '0 0 10px 0',
    fontSize: '24px',
    color: '#F59E0B',
    letterSpacing: '2px',
  },
  authSubtitle: {
    margin: '0 0 30px 0',
    fontSize: '14px',
    color: '#9ca3af',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    color: '#F59E0B',
    fontVariant: 'small-caps',
  },
  input: {
    background: '#0f172a',
    border: '1px solid #374151',
    padding: '12px',
    color: '#fff',
    fontFamily: "'Courier New', Courier, monospace",
    outline: 'none',
  },
  button: {
    background: '#F59E0B',
    color: '#000',
    border: 'none',
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    fontFamily: "'Courier New', Courier, monospace",
  },
  toggleText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#9ca3af',
    textAlign: 'center',
  },
  link: {
    color: '#F59E0B',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  footer: {
    marginTop: '30px',
    fontSize: '10px',
    color: '#4b5563',
    letterSpacing: '1px',
  },
};
