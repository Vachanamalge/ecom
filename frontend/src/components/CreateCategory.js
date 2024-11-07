import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/e-commerce_project/backend/index.php/categorycontroller/category/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessage(data.message || 'Category created successfully!'); // Use the response message if available
            setName(''); // Clear the input fields
            setDescription('');
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="create-category-container">
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit} className="create-category-form">
                <input 
                    type="text" 
                    placeholder="Category Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="create-category-input"
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="create-category-textarea"
                />
                <button type="submit" className="create-category-button">Create Category</button>
            </form>
            {message && <div className="create-category-message">{message}</div>}
            <div className="navigate-option">
                <button onClick={() => navigate('/categories')} className="navigate-button">Back to Categories</button>
            </div>
        </div>
    );
};

export default CreateCategory;