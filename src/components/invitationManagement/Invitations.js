import React, { useEffect, useState } from 'react';
import { invitationAPI } from '../../api/invitationAPI';
import './InvitationsPanel.css';

export default function InvitationsPanel({ userId, onAccept }) {
    const [invitations, setInvitations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            setIsLoading(true);
            const fetched = await invitationAPI.getUserInvitations(userId);
            setInvitations(fetched);
        } catch (err) {
            console.error('Error loading invitations:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async (id) => {
        try {
            await invitationAPI.acceptInvitation(id);
            setInvitations(prev => prev.filter(inv => inv.id !== id));
            onAccept();
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
        <div className="invitation-panel animate-in">
            <div className="invitation-header">
                <h3>New Invitations</h3>
                <span className="invitation-count">{invitations.length}</span>
            </div>
            
            <div className="invitations-container">
                {invitations.map(inv => (
                    <div
                        key={inv.id}
                        className="invitation-card animate-in"
                    >
                        <div className="invitation-content">
                            <div className="invitation-info">
                                <span className="inviter-name">{inv.inviterName}</span>
                                <span className="invitation-text">invited you to join</span>
                                <span className="group-name">{inv.groupName}</span>
                            </div>
                            <div className="invitation-meta">
                                <span className="invitation-date">
                                    {new Date(inv.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="invitation-actions">
                            <button 
                                className="accept-button"
                                onClick={() => handleAccept(inv.id)}
                            >
                                Accept
                            </button>
                            <button 
                                className="decline-button"
                                onClick={() => handleDecline(inv.id)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}