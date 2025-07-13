import React, { useEffect, useState } from 'react';

export default function AdminPassword({ children }) {
  const [input, setInput] = useState('');
  const [tried, setTried] = useState(false);
  const [ok, setOk] = useState(
    sessionStorage.getItem('isAdmin') === 'true'
  );

  useEffect(() => {
    if (ok) sessionStorage.setItem('isAdmin', 'true');
  }, [ok]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTried(false);
    try {
      const res = await fetch('http://localhost:3001/api' + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input })
      });
      const { success } = await res.json();
      setOk(success);
    } catch (err) {
      console.error(err);
      setOk(false);
    }
    setTried(true);
  };

  if (ok) return <>{children}</>;

  return (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6'
  }}>
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <h2 style={{
        fontSize: '1.5rem',
        textAlign: 'center',
        color: '#111827',
        marginBottom: '0.5rem'
      }}>Admin Login</h2>

      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter admin password"
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          fontSize: '1rem',
          outline: 'none'
        }}
      />

      {tried && !ok && (
        <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>
          Incorrect password
        </p>
      )}

      <button
        type="submit"
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#1e40af')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
      >
        Login
      </button>
    </form>
  </div>
);
}