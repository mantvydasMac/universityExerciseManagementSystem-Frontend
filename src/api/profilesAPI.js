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
    },

    async updateProfile(profile) {
        try {
            const response = await fetch(`/v1/profiles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
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
    }
}