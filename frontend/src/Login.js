import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check for guest credentials
        if (username === 'guest' && password === '1234') {
            navigate('/guest-dashboard'); // Navigate to guest dashboard
            return;
        }

        // Check for admin credentials
        if (username === 'admin' && password === '1234') {
            navigate('/admin-dashboard'); // Navigate to admin dashboard
            return;
        }

        // Proceed with normal login for regular users
        try {
            const response = await fetch('http://localhost/e-commerce_project/backend/index.php/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.status === 'success') {
                setMessage(data.message);
                // Navigate based on user role
                if (data.user.role === 'admin') {
                    navigate('/admin-dashboard'); // Admin dashboard
                } else {
                    navigate('/dashboard'); // Regular user dashboard
                }
            } else {
                setMessage(data.message || 'Login failed: Invalid credentials.');
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="login-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <div className="login-message">{message}</div>}
            <div className="register-link">
                <p>
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;