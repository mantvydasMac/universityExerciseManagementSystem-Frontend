import React, { useState } from 'react';
import GroupCard from './GroupCard';
import './styles/GroupDashboard.css';
import {invitationAPI} from "../../api/invitationAPI";

export default function GroupDashboard({ groups }) {
    const [menuOpenFor, setMenuOpenFor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [inviteEmail, setInviteEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const toggleMenu = id => setMenuOpenFor(prev => (prev === id ? null : id));
    const closeMenu = () => setMenuOpenFor(null);

    const userId = 5;

    const inviteToGroup = id => {
        setSelectedGroupId(id);
        setShowModal(true);
    };

    const handleSendInvitation = async () => {
        if (!inviteEmail) {
            setErrorMessage('Email is required');
            return;
        }

        try {
            await invitationAPI.sendGroupInvitation({
                email: inviteEmail,
                groupId: selectedGroupId,
                invitedBy: userId,
            });

            setSuccessMessage('Invitation sent!');
            setInviteEmail('');
            setTimeout(() => {
                setShowModal(false);
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    if (!groups || groups.length === 0) {
        return <p className="group-list__empty">You currently have no groups. Click + in bottom right to create or join group!</p>;
    }

    return (
        <div className="group-list" onClick={closeMenu}>
            {groups.map(g => (
                <GroupCard
                    key={g.id}
                    group={g}
                    isMenuOpen={menuOpenFor}
                    toggleMenu={toggleMenu}
                    closeMenu={closeMenu}
                    inviteToGroup={() => inviteToGroup(g.id)}
                />
            ))}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>Invite to Group</h2>
                        <input
                            type="email"
                            value={inviteEmail}
                            onChange={e => setInviteEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}
                        <div className="modal-actions">
                            <button onClick={handleSendInvitation}>Send Invitation</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
