import React from 'react';
import './styles/LoginDashboard.css'

const LoginDashboard = ({ loginData, setLoginData, onSubmit, error }) => {
    return (
        <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                />
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="button-container">
                <button type="submit" className="login-button">
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default LoginDashboard;