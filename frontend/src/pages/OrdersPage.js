import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPassword from '../components/AdminPassword';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get('http://localhost:3001/orders')
         .then(res => setOrders(res.data))
         .catch(() => alert('ดึงรายการสั่งอาหารไม่สำเร็จ'));
  };

  useEffect(fetchOrders, []);

  const handleDelete = (id) => {
    if (!window.confirm('ยืนยันลบรายการนี้?')) return;
    axios.delete(`http://localhost:3001/order/${id}`)
         .then(() => fetchOrders())
         .catch(() => alert('ลบไม่สำเร็จ'));
  };

  const renderItems = (itemsJson) => {
    try {
      const arr = JSON.parse(itemsJson);
      return arr.map(i => `${i.name} (${i.qty})`).join(', ');
    } catch {
      return '';
    }
  };

  return (
  <AdminPassword>
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>รายการสั่งอาหาร</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <b>{o.customer}</b>: {renderItems(o.items)}
            <br />
            <i>หมายเหตุ: {o.note || '-'}</i>
            <br />
            <button
              onClick={() => handleDelete(o.id)}
              style={{
                marginTop: '0.3rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '0.2rem 0.6rem',
                cursor: 'pointer'
              }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  </AdminPassword>
);
}
