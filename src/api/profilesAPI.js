import { authAPI } from './authAPI';

export const profilesAPI = {
    async fetchProfilesOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/profiles/of-group/${groupId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching profiles:', error);
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
    }
};