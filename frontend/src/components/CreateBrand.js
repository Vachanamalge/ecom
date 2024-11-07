// src/components/CreateBrand.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBrand = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://your-api-url.com/api/categories');
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://your-api-url.com/api/brands', { name, description, category_id: categoryId });
            setSuccess('Brand created successfully!');
            setError(null);
            setName('');
            setDescription('');
            setCategoryId('');
        } catch (err) {
            setError('Error creating brand.');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Create Brand</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Brand</button>
            </form>
        </div>
    );
};

export default CreateBrand;