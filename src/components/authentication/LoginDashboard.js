import React from 'react';

const LoginDashboard = ({ loginData, setLoginData, onSubmit, error }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <button type="submit" className="btn btn-primary w-100 mb-2">
                Sign In
            </button>
        </form>
    );
};

export default LoginDashboard;