export const invitationAPI = {
    getUserInvitations: async (userId) => {
        const res = await fetch(`/v1/invitations/invites/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch invitations');
        return await res.json();
    },
    acceptInvitation: async (invitationId) => {
        const res = await fetch(`/v1/invitations/accept/${invitationId}`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to accept invitation');
        return await res.text();
    },
    declineInvitation: async (invitationId) => {
        const res = await fetch(`/v1/invitations/decline/${invitationId}`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to decline invitation');
        return await res.text();
    }
};