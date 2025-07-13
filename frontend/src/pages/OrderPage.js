import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderPage() {
  const [menus, setMenus] = useState([]);
  const [customer, setCustomer] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [items, setItems] = useState({});
  const [selected, setSelected] = useState({});
  const [note, setNote] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/menus')
      .then(res => setMenus(res.data))
      .catch(() => alert('ดึงเมนูไม่สำเร็จ'));
  }, []);

  const toggleSelect = (name) => {
    setSelected(prev => {
      const isChecked = !prev[name];

      if (isChecked) {
        setItems(p => ({ ...p, [name]: 1 }));
      } else {
        setItems(p => {
          const { [name]: _, ...rest } = p;
          return rest;
        });
      }

      return { ...prev, [name]: isChecked };
    });
  };

  const setItemQuantity = (name, qty) => {
    const quantity = parseInt(qty) || 0;
    setItems(prev => ({ ...prev, [name]: quantity }));
  };

  const handleSubmit = () => {
    const selectedItems = Object.entries(items)
      .filter(([name, qty]) => selected[name] && qty > 0)
      .map(([name, qty]) => ({ name, qty }));

    if (selectedItems.length === 0) {
      alert('กรุณาเลือกอย่างน้อยหนึ่งเมนูพร้อมจำนวน');
      return;
    }

    const orderNote = note.trim() === '' ? '-' : note.trim();

    axios.post('http://localhost:3001/order', { customer, items: selectedItems, note: orderNote })
      .then(() => {
        alert('ส่งคำสั่งซื้อแล้ว');
        setItems({});
        setSelected({});
        setNote('');
      })
      .catch(() => alert('เกิดข้อผิดพลาด'));
  };

  if (!confirmed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>กรุณากรอกชื่อลูกค้า</h2>
        <input
          style={{ padding: '0.5rem', fontSize: '1rem', width: 200 }}
          value={customer}
          onChange={e => setCustomer(e.target.value)}
          placeholder="ชื่อลูกค้า"
        />
        <br /><br />
        <button
          onClick={() => {
            if (!customer.trim()) {
              alert('กรุณากรอกชื่อก่อน');
              return;
            }
            setConfirmed(true);
          }}
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          เริ่มสั่งอาหาร
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 650, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>สั่งอาหารสำหรับ {customer}</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menus.map(menu => {
          const checked = !!selected[menu.name];
          return (
            <li key={menu.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleSelect(menu.name)}
              />
              <span style={{ marginLeft: 8, width: 220 }}>
                {menu.name} - {menu.price} THB
              </span>
              <input
                type="number"
                min="0"
                value={items[menu.name] ?? ''}
                onChange={e => setItemQuantity(menu.name, e.target.value)}
                placeholder="จำนวน"
                disabled={!checked}
                style={{ width: 80, textAlign: 'center' }}
              />
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <label htmlFor="note" style={{ fontWeight: 'bold' }}>หมายเหตุ (ถ้ามี):</label><br />
        <textarea
          id="note"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="ใส่หมายเหตุเพิ่มเติมที่นี่ (ถ้าไม่มีเว้นว่างไว้)"
          rows={3}
          style={{ width: '90%', padding: '0.5rem', fontSize: '1rem', marginTop: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            padding: '0.7rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          สั่งอาหาร
        </button>
      </div>
    </div>
  );
}
