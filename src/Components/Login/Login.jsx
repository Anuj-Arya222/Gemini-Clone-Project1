// File: src/Components/Login/Login.jsx

import React, { useState } from 'react';
import './Login.css'; // You'll need to create this CSS file

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple check: simulate successful login if both fields are non-empty
        if (username.trim() && password.trim()) {
            onLogin(username); // Call the function passed from App.js
        } else {
            alert("Please enter a username and password.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Aura AI</h1>
                <p>Sign in to continue</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username (e.g., Anuj)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;