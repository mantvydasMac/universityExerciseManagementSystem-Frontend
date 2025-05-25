import React, { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { authAPI } from '../api/authAPI';
import LoginDashboard from '../components/authentication/LoginDashboard';
import RegisterModal from '../components/authentication/RegisterModal';
import Header from '../components/essentials/Header';
import './styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authAPI.login(loginData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'LoginPage failed');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authAPI.register(registerData);
            setShowModal(false);
            setError('');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    const token = authAPI.getToken();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-page">
            <Header title="Welcome" />
            <main className="login-page__main">
                <div className="login-container">
                    <div className="login-card">
                        <h2 className="login-card__title">Sign in</h2>
                        <LoginDashboard
                            loginData={loginData}
                            setLoginData={setLoginData}
                            onSubmit={handleLogin}
                            error={error}
                        />
                        <button
                            type="button"
                            className="register-button"
                            onClick={() => setShowModal(true)}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </main>

            <RegisterModal
                show={showModal}
                onClose={() => setShowModal(false)}
                registerData={registerData}
                setRegisterData={setRegisterData}
                onSubmit={handleRegister}
            />
        </div>
    );
};

export default LoginPage;