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

    async createProfile({ username, userId, groupId }) {
        try {
            const response = await fetch(`/v1/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    userId,
                    groupId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create profile');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    }

}