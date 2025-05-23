import React, { useState } from 'react';
import { authAPI } from '../../api/authAPI';
import Modal from '../essentials/Modal';
import './styles/ChangePasswordModal.css';

const ChangePasswordModal = ({ show, onClose }) => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            await authAPI.changePassword(passwords.oldPassword, passwords.newPassword);
            onClose();
        } catch (error) {
            setError('Old password is incorrect');
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            title="Change Password"
        >
            <form onSubmit={handleSubmit} className="change-password-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="oldPassword" className="form-label">Old Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="button-container">
                    <button type="submit" className="modal-button modal-button--confirm">
                        Change Password
                    </button>
                    <button
                        type="button"
                        className="modal-button modal-button--cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal; 