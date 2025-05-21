import React, { useEffect, useState } from 'react';
import { invitationAPI } from '../../api/invitationAPI';
import './InvitationsPanel.css';

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
            const response = await invitationAPI.acceptInvitation(id);
            setInvitations(prev => prev.filter(inv => inv.id !== id));
            console.log(response);
            onAccepted(response);
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
                <tbody>
                {invitations.map(inv => (
                    <tr key={inv.id}>
                        <td>{inv.inviterName}</td>
                        <td>has invited you to join group: </td>
                        <td>{inv.groupName}</td>
                        <td>at :{new Date(inv.createdAt).toLocaleDateString()}</td>
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