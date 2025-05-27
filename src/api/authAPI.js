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
                localStorage.setItem('token', data.token);
            }
            if (data.userId) {
                localStorage.setItem('userId', data.userId);
            }
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('lastName', data.lastName);
            localStorage.setItem('email', data.email);
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUserId() {
        return localStorage.getItem('userId');
    },

    getFirstName() {
        return localStorage.getItem('firstName');
    },

    getLastName() {
        return localStorage.getItem('lastName');
    },

    getEmail() {
        return localStorage.getItem('email');
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