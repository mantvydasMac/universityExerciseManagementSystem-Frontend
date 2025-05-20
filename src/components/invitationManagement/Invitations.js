import React, { useEffect, useState } from 'react';
import { invitationAPI } from '../../api/invitationAPI';
import './InvitationsPanel.css'; // optional CSS file for isolated styles

export default function InvitationsPanel({ userId, onAccepted }) {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            const fetched = await invitationAPI.getUserInvitations(userId);
            setInvitations(fetched);
        } catch (err) {
            console.error('Error loading invitations:', err);
        }
    };

    const handleAccept = async (id) => {
        try {
            await invitationAPI.acceptInvitation(id);
            setInvitations(prev => prev.filter(inv => inv.id !== id));
            onAccepted(); // notify parent to refresh groups
        } catch (err) {
            console.error('Error accepting invitation:', err);
        }
    };

    const handleDecline = async (id) => {
        try {
            await invitationAPI.declineInvitation(id);
            setInvitations(prev => prev.filter(inv => inv.id !== id));
        } catch (err) {
            console.error('Error declining invitation:', err);
        }
    };

    if (invitations.length === 0) return null;

    return (
        <div className="invitation-table">
            <p>You received an invite!</p>
            <table>
                <thead>
                <tr>
                    <th>From</th>
                    <th>Received</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {invitations.map(inv => (
                    <tr key={inv.id}>
                        <td>{inv.inviterName}</td>
                        <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => handleAccept(inv.id)}>Accept</button>
                            <button onClick={() => handleDecline(inv.id)}>Decline</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}