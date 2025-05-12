const API_BASE_URL = 'http://localhost:8080'; // adjust this to match your backend URL

export const groupAPI = {
    async getUserGroups(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/v1/groups/of-user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    }
};