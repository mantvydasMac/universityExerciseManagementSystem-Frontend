import React, { useState } from 'react';
import { authAPI } from '../../api/authAPI';
import Modal from '../essentials/Modal';
import ChangePasswordModal from './ChangePasswordModal';
import './styles/UserInfoModal.css';

const UserInfoModal = ({ show, onClose }) => {
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const handleLogout = () => {
        authAPI.logout();
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                title="User Information"
            >
                <div className="user-info-modal">
                    <div className="user-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="user-details">
                        <div className="detail-item">
                            <label>First Name:</label>
                            <span>{authAPI.getFirstName()}</span>
                        </div>
                        <div className="detail-item">
                            <label>Last Name:</label>
                            <span>{authAPI.getLastName()}</span>
                        </div>
                        <div className="detail-item">
                            <label>Email:</label>
                            <span>{authAPI.getEmail()}</span>
                        </div>
                    </div>
                    <div className="button-container">
                        <button
                            className="modal-button modal-button--confirm"
                            onClick={() => setShowChangePasswordModal(true)}
                        >
                            Change Password
                        </button>
                        <button
                            className="modal-button modal-button--danger"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                        <button
                            className="modal-button modal-button--cancel"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            <ChangePasswordModal
                show={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
            />
        </>
    );
};

export default UserInfoModal; 