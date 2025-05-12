export const groupAPI = {
    async getUserGroups(userId) {
        try {
            const response = await fetch(`/v1/groups/of-user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    },

    async createGroup(name, creatorId) {
        try {
            const groupResponse = await fetch(`/v1/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    profileIds: [],
                    taskIds: []
                })
            });

            if (!groupResponse.ok) {
                const errorData = await groupResponse.text();
                throw new Error(`Failed to create group: ${errorData}`);
            }

            const createdGroup = await groupResponse.json();

            const profileResponse = await fetch(`/v1/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: creatorId,
                    groupId: createdGroup.id,
                    role: 'OWNER',
                    joinedDate: new Date().toISOString(),
                })
            });

            if (!profileResponse.ok) {
                const errorData = await profileResponse.text();
                throw new Error(`Failed to create profile: ${errorData}`);
            }

            const createdProfile = await profileResponse.json();

            const updatedGroup = {
                ...createdGroup,
                profileIds: [createdProfile.id]
            };

            const updateGroupResponse = await fetch(`/v1/groups`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGroup)
            });

            if (!updateGroupResponse.ok) {
                const errorData = await updateGroupResponse.text();
                throw new Error(`Failed to update group with profile: ${errorData}`);
            }

            return await updateGroupResponse.json();
        } catch (error) {
            console.error('Error in createGroup:', error);
            throw error;
        }
    }
};