export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>📍 Live Location Tracker</h1>
      <p>Sign in with Google to share and see live locations</p>
      <button onClick={handleLogin} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', background: '#4285F4', color: 'white', border: 'none' }}>
        Sign in with Google
      </button>
    </div>
  );
}
