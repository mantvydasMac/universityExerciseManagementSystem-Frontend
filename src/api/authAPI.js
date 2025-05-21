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
                throw new Error('Login failed');
            }
            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem('token', data.token);
            }
            if (data.userId) {
                sessionStorage.setItem('userId', data.userId);
            }
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    },

    getToken() {
        return sessionStorage.getItem('token');
    },

    getUserId() {
        return sessionStorage.getItem('userId');
    },

    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }
}; 