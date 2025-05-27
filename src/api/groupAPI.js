import { authAPI } from './authAPI';

export const groupAPI = {
    async getUserGroups(userId) {
        try {
            const response = await fetch(`/v1/groups/of-user/${userId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    },

    async getGroupById(groupId) {
        try {
            const response = await fetch(`/v1/groups/${groupId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to get group');
            }
            return await response.json();

        } catch (error) {
            console.error('Error getting group:', error);
            throw error;
        }
    },

    async createGroup(name, creatorId) {
        try {
            const groupResponse = await fetch(`/v1/groups`, {
                method: 'POST',
                headers: authAPI.getAuthHeaders(),
                body: JSON.stringify({
                    groupName: name,
                    creatorId: creatorId,
                })
            });

            if (!groupResponse.ok) {
                const errorData = await groupResponse.text();
                throw new Error(`Failed to create group: ${errorData}`);
            }

            return await groupResponse.json();
        } catch (error) {
            console.error('Error in createGroup:', error);
            throw error;
        }
    },

    async fetchGroupById(groupId) {
        try {
            const response = await fetch(`/v1/groups/${groupId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch group');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
};