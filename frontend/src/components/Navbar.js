import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkStyle = {
    padding: '0.75rem 1.25rem',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
  };

  const activeStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
      }}
    >
      <NavLink to="/menu" style={linkStyle} activeStyle={activeStyle} exact>
        เมนูทั้งหมด
      </NavLink>
      <NavLink to="/order" style={linkStyle} activeStyle={activeStyle}>
        สั่งอาหาร
      </NavLink>
      <NavLink to="/add-menu" style={linkStyle} activeStyle={activeStyle}>
        เพิ่มเมนู
      </NavLink>
      <NavLink to="/manage-menu" style={linkStyle} activeStyle={activeStyle}>
        แก้ไขเมนู
      </NavLink>
      <NavLink to="/orders" style={linkStyle} activeStyle={activeStyle}>
        รายการสั่งอาหาร
      </NavLink>
    </nav>
  );
}
