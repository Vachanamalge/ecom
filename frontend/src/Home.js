// src/Home.js
import React from 'react';

import { Link } from 'react-router-dom';


const Home = () => {

    return (

        <div>

            <h1>Welcome to the Home Page</h1>

            <p>

                <Link to="/register">Register</Link>

            </p>

            <p>

                <Link to="/login">Login</Link>

            </p>

        </div>

    );

};

export default Home;