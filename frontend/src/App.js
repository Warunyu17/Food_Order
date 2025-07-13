import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import AddMenuPage from './pages/AddMenuPage';
import OrdersPage from './pages/OrdersPage';
import Navbar from './components/Navbar';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/add-menu" element={<AddMenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}