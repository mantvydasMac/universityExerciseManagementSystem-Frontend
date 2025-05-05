import React, { useState, useRef, useEffect } from 'react';
import OverflowMenu from '../../components/essentials/OverflowMenu';
import './styles/GroupDashboard.css';

export default function GroupCard({ group, isMenuOpen, toggleMenu, closeMenu }) {
    const nameRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [slideDistance, setSlideDistance] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const CONSTANT_SPEED = 100;

    useEffect(() => {
        const nameEl = nameRef.current;
        if (nameEl) {
            const overflows = nameEl.scrollWidth > nameEl.clientWidth;
            setIsOverflowing(overflows);
            if (overflows) {
                setSlideDistance(nameEl.scrollWidth - nameEl.clientWidth);
            }
        }
    }, [group.name]);

    const handleMouseEnter = () => {
        if (isOverflowing) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const hoverDuration = isOverflowing ? slideDistance / CONSTANT_SPEED : 0;

    const defaultDuration = 0.2;

    const transformStyle = {
        transform: isHovered && isOverflowing ? `translateX(-${slideDistance}px)` : 'translateX(0)',
        transition: `transform ${isHovered ? hoverDuration : defaultDuration}s linear`,
        maskImage: isHovered && isOverflowing ? 'none' : undefined,
        WebkitMaskImage: isHovered && isOverflowing ? 'none' : undefined,
    };

    return (
        <div className="group-card" onClick={e => e.stopPropagation()}>
            <div className="group-card__icon">🎓</div>
            <div className="group-card__header">
                <div
                    className="group-card__name-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className={`group-card__name ${isOverflowing ? 'slideable' : ''}`}
                        ref={nameRef}
                        style={transformStyle}
                    >
                        {group.name}
                    </div>
                </div>
                <button
                    className="overflow-menu-button"
                    onClick={() => toggleMenu(group.id)}
                    aria-label="Group actions"
                >
                    ⋮
                </button>
                <OverflowMenu
                    open={isMenuOpen === group.id}
                    items={[
                        { label: 'Modify', onClick: closeMenu },
                        { label: 'Get Share Link', onClick: closeMenu },
                        { label: 'Delete', onClick: closeMenu, danger: true },
                    ]}
                />
            </div>
        </div>
    );
}