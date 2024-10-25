import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    // Hide navbar completely if we're on the login page
    if (location.pathname === '/') {
        return null
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/display" className="navbar-brand">
                    Bright Ideas
                </Link>
                
                {location.pathname !== '/display' && (
                    <Link to="/display" className="btn btn-outline-light">
                        Back to Ideas
                    </Link>
                )}
                
                <div className="ms-auto">
                    <Link to="/" className="btn btn-danger">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
