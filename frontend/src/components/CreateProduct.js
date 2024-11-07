// src/components/CreateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null); // Changed to store the file directly
    const [brandId, setBrandId] = useState('');
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await axios.get('http://your-api-url.com/api/brands');
            setBrands(response.data);
        };

        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand_id', brandId);
        formData.append('price', price);
        formData.append('description', description);
        if (imageFile) {
            formData.append('image', imageFile); // Append the image file
        }

        try {
            const response = await axios.post('http://your-api-url.com/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });
            setSuccess('Product created successfully!');
            setError(null);
            setName('');
            setPrice('');
            setDescription('');
            setImageFile(null); // Reset the image file
            setBrandId('');
        } catch (err) {
            setError('Error creating product.');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
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
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*" // Accept only image files
                        onChange={(e) => setImageFile(e.target.files[0])} // Get the first file
                    />
                </div>
                <div>
                    <label>Brand:</label>
                    <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;