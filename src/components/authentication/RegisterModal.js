import React from 'react';
import Modal from '../essentials/Modal';

const RegisterForm = ({ registerData, setRegisterData, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
        </form>
    );
};

const RegisterModal = ({ show, onClose, registerData, setRegisterData, onSubmit }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            title="Register"
        >
            <RegisterForm
                registerData={registerData}
                setRegisterData={setRegisterData}
                onSubmit={onSubmit}
            />
            <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={onClose}
            >
                Cancel
            </button>
        </Modal>
    );
};

export default RegisterModal; 