import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPassword from '../components/AdminPassword';

export default function ManageMenuPage() {
  const [menus, setMenus] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  const fetchMenus = () =>
    axios.get('http://localhost:3001/menus')
         .then(res => setMenus(res.data))
         .catch(() => alert('โหลดเมนูไม่สำเร็จ'));

  useEffect(fetchMenus, []);

  /* --- Delete --- */
  const handleDelete = id => {
    if (!window.confirm('ยืนยันลบเมนูนี้?')) return;
    axios.delete(`http://localhost:3001/menu/${id}`)
         .then(fetchMenus)
         .catch(() => alert('ลบไม่สำเร็จ'));
  };

  /* --- Edit --- */
  const startEdit = m => {
    setEditId(m.id);
    setForm({ name: m.name, price: m.price, description: m.description });
  };

  const cancelEdit = () => { setEditId(null); setForm({ name:'',price:'',description:'' }); };

  const saveEdit = () => {
    axios.put(`http://localhost:3001/menu/${editId}`, form)
         .then(() => { cancelEdit(); fetchMenus(); })
         .catch(() => alert('บันทึกไม่สำเร็จ'));
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  /* --- UI --- */
  return (
    <AdminPassword>
      <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily:'Arial, sans-serif' }}>
        <h2 style={{ textAlign:'center' }}>จัดการเมนูอาหาร</h2>

        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#f1f1f1' }}>
              <th style={{ border:'1px solid #ccc' }}>รูป</th>
              <th style={{ border:'1px solid #ccc' }}>ชื่อ</th>
              <th style={{ border:'1px solid #ccc' }}>ราคา</th>
              <th style={{ border:'1px solid #ccc' }}>คำอธิบาย</th>
              <th style={{ border:'1px solid #ccc' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {menus.map(m => (
              editId === m.id ? (
                <tr key={m.id}>
                  <td colSpan={5} style={{ padding:10 }}>
                    <input name="name" value={form.name} onChange={onChange} placeholder="ชื่อ" />
                    <input name="price" value={form.price} onChange={onChange} type="number" placeholder="ราคา" />
                    <input name="description" value={form.description} onChange={onChange} placeholder="คำอธิบาย" style={{ width:200 }} />
                    <button onClick={saveEdit}>บันทึก</button>
                    <button onClick={cancelEdit}>ยกเลิก</button>
                  </td>
                </tr>
              ) : (
                <tr key={m.id}>
                  <td style={{ border:'1px solid #ccc' }}>
                    {m.image_url && <img src={`http://localhost:3001${m.image_url}`} alt="" width={50}/>}
                  </td>
                  <td style={{ border:'1px solid #ccc' }}>{m.name}</td>
                  <td style={{ border:'1px solid #ccc' }}>{parseFloat(m.price).toFixed(2)}</td>
                  <td style={{ border:'1px solid #ccc' }}>{m.description}</td>
                  <td style={{ border:'1px solid #ccc' }}>
                    <button onClick={() => startEdit(m)}>แก้ไข</button>{' '}
                    <button onClick={() => handleDelete(m.id)} style={{ color:'red' }}>ลบ</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </AdminPassword>
  );
}
