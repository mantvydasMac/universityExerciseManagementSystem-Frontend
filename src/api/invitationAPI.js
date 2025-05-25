import {authAPI} from "./authAPI";

export const invitationAPI = {
    getUserInvitations: async (userId) => {
        const res = await fetch(`/v1/invitations/invites/${userId}`, {
            headers: authAPI.getAuthHeaders(),
        });
        if (!res.ok) throw new Error('Failed to fetch invitations');
        return await res.json();
    },
    acceptInvitation: async (invitationId) => {
        const res = await fetch(`/v1/invitations/accept/${invitationId}`, {
            headers: authAPI.getAuthHeaders(),
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to accept invitation');
        return await res.text();
    },
    declineInvitation: async (invitationId) => {
        const res = await fetch(`/v1/invitations/decline/${invitationId}`, {
            method: 'POST',
            headers: authAPI.getAuthHeaders(),
        });
        if (!res.ok) throw new Error('Failed to decline invitation');
        return await res.text();
    },
    sendGroupInvitation: async ({ email, groupId, invitedBy })=> {
        const response = await fetch('/v1/invitations/create', {
            method: 'POST',
            headers: authAPI.getAuthHeaders(),
            body: JSON.stringify({
                inviteeEmail: email,
                groupId,
                inviterId: invitedBy,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to send invitation');
        }

        return await response.json();
    },
};