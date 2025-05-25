import React from 'react';
import UserSection from '../userManagement/UserSection';
import './styles/Header.css';

export default function Header({ title }) {
    return (
        <header className="App-header">
            <h1>{title}</h1>
            <UserSection />
        </header>
    );
}