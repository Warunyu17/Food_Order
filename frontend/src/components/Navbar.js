import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkBaseStyle = {
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 500,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };

  const activeStyle = {
    backgroundColor: '#0056b3',
  };

  const hoverStyle = {
    backgroundColor: '#3399ff',
  };

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        padding: '1rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px 12px 12px 12px',
      }}
    >
      {[
        { to: '/menu', label: 'เมนูทั้งหมด', exact: true },
        { to: '/order', label: 'สั่งอาหาร' },
        { to: '/add-menu', label: 'เพิ่มเมนู' },
        { to: '/orders', label: 'รายการสั่งอาหาร' },
      ].map(({ to, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          exact={exact}
          style={({ isActive, isPending }) => ({
            ...linkBaseStyle,
            ...(isActive ? activeStyle : {}),
            ':hover': hoverStyle,
          })}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
