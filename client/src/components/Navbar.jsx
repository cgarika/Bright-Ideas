import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav>
            <div className="container">
                <h1>Bright Ideas</h1>

                {/* Only show additional links if not on the login page */}
                {location.pathname !== '/' && (
                    <>
                {/* Only show the "Back to Ideas" link if not on the "/bright_ideas" page */}
                {location.pathname !== '/bright_ideas' && (
                    <Link to="/bright_ideas">
                        Back to Ideas
                    </Link>
                )}

                        <div>
                            <Link to="/">
                                Logout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
