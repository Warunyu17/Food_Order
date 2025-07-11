import React, { useState } from 'react';

export default function AdminPassword({ correct = '123456', children }) {
  const [input, setInput] = useState('');
  const [ok, setOk] = useState(false);
  const [tried, setTried] = useState(false);

  const handleSubmit = () => {
    setTried(true);
    if (input === correct) setOk(true);
  };

  if (ok) return children;

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Admin Access</h2>
      <input
        type="password"
        placeholder="Enter Password"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Enter</button>
      {tried && input !== correct && (<p style={{ color: 'red' }}>Wrong Password</p>)}
    </div>
  );
}