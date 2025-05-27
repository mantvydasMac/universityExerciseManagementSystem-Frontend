import React from 'react';
import UserSection from '../userManagement/UserSection';
import './styles/Header.css';

export default function Header({ title, showBackLink }) {
    return (
        <header className="App-header" style={{ position: 'relative' }}>
            {showBackLink && (
                <a
                    href="/"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '1.3rem'
                    }}
                >
                    My Groups
                </a>
            )}
            <h1>{title}</h1>
            <UserSection/>
        </header>
    );
}
