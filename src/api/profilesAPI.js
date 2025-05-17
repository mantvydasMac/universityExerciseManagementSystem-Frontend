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
    }
}