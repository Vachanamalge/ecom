// src/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Optional: Import CSS for styling

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleManageCategories = () => {
        navigate('/manage-categories'); // Navigate to the manage categories page
    };

    const handleCreateCategory = () => {
        navigate('/create-category'); // Navigate to the create category page
    };

    const handleManageBrands = () => {
        navigate('/manage-brands'); // Navigate to the manage brands page
    };

    const handleCreateBrand = () => {
        navigate('/create-brand'); // Navigate to the create brand page
    };

    const handleManageProducts = () => {
        navigate('/manage-products'); // Navigate to the manage products page
    };

    const handleCreateProduct = () => {
        navigate('/create-product'); // Navigate to the create product page
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="card-container">
                <div className="card">
                    <h2>Manage Categories</h2>
                    <button onClick={handleManageCategories}>Manage Categories</button>
                    <button onClick={handleCreateCategory}>Create Category</button>
                </div>

                <div className="card">
                    <h2>Manage Brands</h2>
                    <button onClick={handleManageBrands}>Manage Brands</button>
                    <button onClick={handleCreateBrand}>Create Brand</button>
                </div>

                <div className="card">
                    <h2>Manage Products</h2>
                    <button onClick={handleManageProducts}>Manage Products</button>
                    <button onClick={handleCreateProduct}>Create Product</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;