export const profilesAPI = {
    async fetchProfilesOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/profiles/of-group/${groupId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            return await response.json();

        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    },

    async getProfileById(profileId) {
        try {
            const response = await fetch(`/v1/profiles/${profileId}`);
            if (!response.ok) {
                throw new Error('Failed to get profile');
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting profile:', error);
            throw error;
        }
    }
}