import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MenuPage() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/menus')
      .then(res => setMenus(res.data))
      .catch(() => alert('ดึงเมนูไม่สำเร็จ'));
  }, []);

  if (menus.length === 0) return <p style={{ textAlign: 'center' }}>ไม่มีเมนูในระบบ</p>;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '2rem auto',
        display: 'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {menus.map(menu => (
        <div
          key={menu.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            backgroundColor: '#fff'
          }}
        >
          {menu.image_url && (
            <img
              src={`http://localhost:3001${menu.image_url}`}
              alt={menu.name}
              style={{ width: '100%', height: 140, objectFit: 'cover' }}
            />
          )}

          <div style={{ padding: '0.8rem' }}>
            <h3 style={{ margin: '0 0 0.5rem' }}>{menu.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#555', minHeight: 48 }}>
              {menu.description}
            </p>
            <p style={{ fontWeight: 'bold', color: '#007bff' }}>
              {parseFloat(menu.price).toFixed(2)} THB
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
