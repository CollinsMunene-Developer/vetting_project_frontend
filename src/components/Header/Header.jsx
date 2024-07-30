import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const home = () => {
        navigate('/');
    };
    const about = () => {
        navigate('/about');
    };
    const contact = () => {
        navigate('/contact');
    };
    const startVetting = () => {
        navigate('/welcome');
    };
    const signup = () => {
        navigate('/register');
    };
    const login = () => {
        navigate('/login');
    };

    return (
        <>
            <header className="header">
                <div className="logo">GPT_VETTING</div>
                <nav className="nav-links">
                    <ul className='nav-links'>
                        <li><a href="#" onClick={home}>Home</a></li>
                        <li><a href="#" onClick={about}>About</a></li>
                        <li><a href="#" onClick={contact}>Contact</a></li>
                        <li><a href="#" onClick={startVetting}>Start Vetting</a></li>
                        <li className='reg_button'><a href="#" onClick={signup}><button>Sign up</button></a></li>
                        <li className='login_button'><a href="#" onClick={login}><button>Login</button></a></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
