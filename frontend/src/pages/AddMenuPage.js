import React, { useState } from 'react';
import axios from 'axios';
import AdminPassword from '../components/AdminPassword';

export default function AddMenuPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleAdd = () => {
    if (!name || !price || !description || !image) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    axios.post('http://localhost:3001/menu', formData)
      .then(() => {
        alert('เพิ่มเมนูสำเร็จ');
        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
        document.getElementById('imageInput').value = ''; // reset file input
      })
      .catch(() => alert('เกิดข้อผิดพลาดในการเพิ่มเมนู'));
  };

  return (
    <AdminPassword>
      <div style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>เพิ่มเมนูอาหาร</h2>

        <input
          placeholder="ชื่ออาหาร"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        <input
          type="number"
          placeholder="ราคา"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        <textarea
          placeholder="คำอธิบาย"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', minHeight: '80px' }}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          style={{ marginBottom: '1rem' }}
        />

        <button
          onClick={handleAdd}
          style={{
            width: '100%',
            padding: '0.7rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          เพิ่มเมนู
        </button>
      </div>
    </AdminPassword>
  );
}
