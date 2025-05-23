import React, { useState } from 'react';
import { authAPI } from '../../api/authAPI';
import UserInfoModal from './UserInfoModal';
import './styles/UserSection.css';

const UserSection = () => {
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    const handleUserClick = () => {
        setShowUserInfoModal(true);
    };

    // Check if we're on the login page
    if (window.location.pathname === '/login') {
        return null;
    }

    return (
        <div className="user-section">
            <button className="user-button" onClick={handleUserClick}>
                <div className="user-icon">
                    <i className="fas fa-user"></i>
                </div>
                <div className="user-info">
                    <span className="user-name">
                        {authAPI.getFirstName()} {authAPI.getLastName()}
                    </span>
                </div>
            </button>

            <UserInfoModal
                show={showUserInfoModal}
                onClose={() => setShowUserInfoModal(false)}
            />
        </div>
    );
};

export default UserSection; 