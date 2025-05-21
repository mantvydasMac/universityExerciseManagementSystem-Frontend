import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/authAPI';
import LoginDashboard from '../components/authentication/LoginDashboard';
import RegisterModal from '../components/authentication/RegisterModal';
import Header from '../components/essentials/Header';
import './styles/LoginPage.css';

const Login = () => {
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
            setError(err.message || 'Login failed');
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

    return (
        <div className="login-page">
            <Header title="Welcome" />
            <main className="login-page__main">
                <div className="card-body">
                    <h2 className="text-center mb-4">Sign in</h2>
                    <LoginDashboard
                        loginData={loginData}
                        setLoginData={setLoginData}
                        onSubmit={handleLogin}
                        error={error}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => setShowModal(true)}
                    >
                        Register
                    </button>
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

export default Login; 