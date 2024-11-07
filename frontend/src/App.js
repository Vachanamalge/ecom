// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; // Regular user dashboard
import AdminDashboard from './AdminDashboard'; // Admin dashboard
import GuestDashboard from './GuestDashboard'; // Import the Guest Dashboard component
import CreateCategory from './components/CreateCategory';
import CreateBrand from './components/CreateBrand';
import CreateProduct from './components/CreateProduct';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/guest-dashboard" element={<GuestDashboard />} /> {/* Added guest dashboard route */}
                <Route path="/create-category" element={<CreateCategory />} />
                <Route path="/create-brand" element={<CreateBrand />} />
                <Route path="/create-product" element={<CreateProduct />} />
            </Routes>
        </Router>
    );
};

export default App;

