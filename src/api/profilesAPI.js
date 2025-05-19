export const profilesAPI = {
    async fetchProfilesOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/profiles/of-group/${groupId}`);
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
            const response = await fetch(`/v1/profiles/${profileId}`);
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
            const response = await fetch(`/v1/profiles/of-user/${userId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch user profiles: ${response.statusText}`);
            }
            return response.json();
        } catch (err) {
            console.error('Error fetching profiles by user:', err);
            throw err;
        }
    }
}