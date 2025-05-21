import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OverflowMenu from '../../components/essentials/OverflowMenu';
import './styles/GroupDashboard.css';

export default function GroupCard({ group, isMenuOpen, toggleMenu, closeMenu, inviteToGroup }) {
    const nameRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [slideDistance, setSlideDistance] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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
        if (isOverflowing) setIsHovered(true);
    };
    const handleMouseLeave = () => setIsHovered(false);

    const handleCardClick = e => {
        e.stopPropagation();
        navigate(`/groups/${group.id}/tasks`);
    };

    const hoverDuration = isOverflowing ? slideDistance / 100 : 0.2;
    const transformStyle = {
        transform: isHovered
            ? `translateX(-${slideDistance}px)`
            : 'translateX(0)',
        transition: `transform ${hoverDuration}s linear`,
        maskImage: isHovered ? 'none' : undefined,
        WebkitMaskImage: isHovered ? 'none' : undefined,
    };

    return (
        <div
            className="group-card"
            onClick={handleCardClick}
        >
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
                    onClick={e => { e.stopPropagation(); toggleMenu(group.id); }}
                    aria-label="Group actions"
                >
                    ⋮
                </button>

                <OverflowMenu
                    open={isMenuOpen === group.id}
                    items={[
                        { label: 'Modify', onClick: closeMenu },
                        { label: 'Invite to group', onClick: (e) => {
                                e.stopPropagation();
                                inviteToGroup(group.id);
                            }},
                        { label: 'Delete', onClick: closeMenu, danger: true },
                    ]}
                />
            </div>
        </div>
    );
}