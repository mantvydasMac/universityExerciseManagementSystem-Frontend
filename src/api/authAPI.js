export const authAPI = {
    async register(userData) {
        try {
            const response = await fetch('/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },

    async login(credentials) {
        try {
            const response = await fetch('/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('LoginPage failed');
            }
            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem('token', data.token);
            }
            if (data.userId) {
                sessionStorage.setItem('userId', data.userId);
            }
            sessionStorage.setItem('firstName', data.firstName);
            sessionStorage.setItem('lastName', data.lastName);
            sessionStorage.setItem('email', data.email);
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('email');
    },

    getToken() {
        return sessionStorage.getItem('token');
    },

    getUserId() {
        return Number(sessionStorage.getItem('userId'));
    },

    getFirstName() {
        return sessionStorage.getItem('firstName');
    },

    getLastName() {
        return sessionStorage.getItem('lastName');
    },

    getEmail() {
        return sessionStorage.getItem('email');
    },

    async changePassword(oldPassword, newPassword) {
        try {
            const response = await fetch('/v1/users/password', {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    email: this.getEmail(),
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            });
            if (!response.ok) {
                throw new Error('Failed to change password');
            }
            // return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }
}; 