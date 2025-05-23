import { authAPI } from './authAPI';

export const profilesAPI = {
    async fetchProfilesOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/profiles/of-group/${groupId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    },

    async updateProfile(profile) {
        try {
            const response = await fetch(`/v1/profiles`, {
                method: 'PUT',
                headers: authAPI.getAuthHeaders(),
                body: JSON.stringify(profile)
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to update profile: ${errorData}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    async fetchProfileById(profileId) {
        try {
            const response = await fetch(`/v1/profiles/${profileId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    async fetchProfilesByUser(userId) {
        try {
            const response = await fetch(`/v1/profiles/of-user/${userId}`, {
                headers: authAPI.getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch user profiles: ${response.statusText}`);
            }
            return response.json();
        } catch (err) {
            console.error('Error fetching profiles by user:', err);
            throw err;
        }
    }
};