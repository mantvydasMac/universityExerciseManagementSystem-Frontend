import React from 'react';
import './styles/Header.css';

export default function Header({ title }) {
    return (
        <header className="App-header">
            <h1>{title}</h1>
        </header>
    );
}