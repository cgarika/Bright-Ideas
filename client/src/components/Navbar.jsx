import React, { useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
import logo from '../assets/light-bulb.png'


const Navbar = () => {
    const location = useLocation();

    const navigate = useNavigate();

    const {user, setUser} = useContext(userContext)


    // Logout functionailty
    const Logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then(() => {
            setUser({});
            localStorage.removeItem('user');
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="navbar-wrapper">
            <div className="navbar-inner">
                <div className="logo-wrapper">
                    <img className='logo' src={logo} alt="Light Bulb Logo" />
                    <h1>Bright Ideas</h1>
                </div>
                <div className="nav-links__wrapper">
                    {/* Only show additional links if not on the login page */}
                    {location.pathname !== '/' && (
                        <>
                            {/* Only show the "Back to Ideas" link if not on the "/bright_ideas" page */}
                            {location.pathname !== '/bright_ideas' && (
                                <Link className='nav-links' to="/bright_ideas">
                                    Back to Ideas
                                </Link>
                            )}
                            <div>
                                <Link className='nav-links' onClick={Logout}>
                                    Logout
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
