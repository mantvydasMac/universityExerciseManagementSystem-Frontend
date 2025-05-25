import React from 'react';
import Modal from '../essentials/Modal';
import './styles/RegisterModal.css';

const RegisterModal = ({ show, onClose, registerData, setRegisterData, onSubmit }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            title="Register"
        >
            <form onSubmit={onSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                        value={registerData.firstName}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                firstName: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                        value={registerData.lastName}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                lastName: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registerEmail" className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="registerEmail"
                        required
                        value={registerData.email}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        required
                        value={registerData.password}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="modal-button modal-button--confirm">
                        Register
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

export default RegisterModal; 