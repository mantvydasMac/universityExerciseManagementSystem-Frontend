import React, { useState } from 'react';
import GroupCard from './GroupCard';
import './styles/GroupDashboard.css';

export default function GroupDashboard({ groups }) {
    const [menuOpenFor, setMenuOpenFor] = useState(null);
    const toggleMenu = id => setMenuOpenFor(prev => (prev === id ? null : id));
    const closeMenu = () => setMenuOpenFor(null);

    if (!groups || groups.length === 0) {
        return <p className="group-list__empty">You currently have no groups. Click + in bottom right to create or join group!</p>;
    }

    return (
        <div
            className="group-list"
            onClick={closeMenu}
        >
            {groups.map(g => (
                <GroupCard
                    key={g.id}
                    group={g}
                    isMenuOpen={menuOpenFor}
                    toggleMenu={toggleMenu}
                    closeMenu={closeMenu}
                />
            ))}
        </div>
    );
}