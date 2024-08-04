import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // This is placeholder, replace with actual user data
            setUser({name: 'John Doe', email: 'john@example.com'});
        }
    }, []);

    const home = () => navigate('/');
    const about = () => navigate('/about');
    const contact = () => navigate('/contact');
    const startVetting = () => navigate('/welcome');
    const signup = () => navigate('/register');
    const login = () => navigate('/login');
    const dashboard = () => navigate('/dashboard');

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        setShowDropdown(false);
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="header">
            <div className="logo">GPT_VETTING</div>
            <nav className="nav-links">
                <ul>
                    <li><a href="#" onClick={home}>Home</a></li>
                    <li><a href="#" onClick={about}>About</a></li>
                    <li><a href="#" onClick={contact}>Contact</a></li>
                    <li><a href="#" onClick={startVetting}>Start Vetting</a></li>
                    {
                        !isLoggedIn && (
                            <>
                                <li className='reg_button'><a href="#" onClick={signup}><button>Sign up</button></a></li>
                                <li className='login_button'><a href="#" onClick={login}><button>Login</button></a></li>
                            </>
                        )
                    }
                    {
                        isLoggedIn && user && (
                            <li className="user-info">
                                <div className='user-circle' onClick={toggleDropdown}>
                                    {user.name.charAt(0)}
                                </div>
                                <span className="user-email">{user.email}</span>
                                {showDropdown && (
                                    <div className="user-dropdown">
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                        <button onClick={dashboard}>Dashboard</button>
                                        <button onClick={handleLogOut}>Logout</button>
                                    </div>
                                )}
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;