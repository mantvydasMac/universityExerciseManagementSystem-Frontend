import React from 'react';
import './styles/OverflowMenu.css';

export default function OverflowMenu({ open, items, placement = 'bottom' }) {
    if (!open) return null;
    const cls = ['overflow-menu'];
    if (placement === 'top') cls.push('overflow-menu--top');
    return (
        <div className={cls.join(' ')}>
            {items.map(({ label, onClick, danger }, i) => (
                <button
                    key={i}
                    className={
                        `overflow-menu__item${danger ? ' overflow-menu__item--danger' : ''}`
                    }
                    onClick={onClick}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}