import React, { useState } from 'react';
import { profilesAPI } from '../../api/profilesAPI';
import './styles/CreateProfileModal.css';

export default function CreateProfileModal({ show, groupId, userId, onClose, onCreate }) {
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!show) return null;

    const handleSubmit = async e => {
        e.preventDefault();
        if (!nickname.trim()) {
            setError('Nickname is required.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const newProfile = await profilesAPI.createProfile({
                groupId,
                userId,
                username:nickname,
            });
            onCreate(newProfile);
        } catch (err) {
            console.error('Failed to create profile:', err);
            setError('Could not create profile. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Create Your Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nickname:
                        <input
                            type="text"
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                            disabled={loading}
                        />
                    </label>
                    {error && <p className="error">{error}</p>}
                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}