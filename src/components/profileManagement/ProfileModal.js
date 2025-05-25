import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import { profilesAPI } from '../../api/profilesAPI';
import ProfileUpdateForm from './ProfileUpdateForm';
import './styles/ProfileModal.css';

export default function ProfileModal({ profileId, onClose }) {
    const currentProfileId = 1; // placeholder
    const [profile, setProfile] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const p = await profilesAPI.fetchProfileById(profileId);
                setProfile(p);
            } catch (err) {
                console.error('Error loading profile:', err);
            }
        })();
    }, [profileId]);

    const toggleEditMode = () => setIsEditMode(m => !m);

    const handleSubmit = async updatedProfile => {
        try {
            const saved = await profilesAPI.updateProfile(updatedProfile);
            setProfile(saved);
            setIsEditMode(false);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const startClose = () => {
        if (!isClosing) setIsClosing(true);
    };

    const onAnimationEnd = e => {
        if (isClosing && e.animationName === 'slideOutPanel') {
            onClose();
        }
    };

    if (!profile) return null;

    return (
        <div
            className={`profile-modal-overlay ${isClosing ? 'fade-out' : ''}`}
            onClick={startClose}
        >
            <div
                className={`profile-page profile-page--modal ${isClosing ? 'slide-out' : ''}`}
                onClick={e => e.stopPropagation()}
                onAnimationEnd={onAnimationEnd}
            >
                <button className="profile-modal__close" onClick={startClose}>
                    <FaTimes />
                </button>

                <div className="profile-page__customization">
                    <div className="profile-page__customization-header">
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-page__customization-body">
                        {!isEditMode ? (
                            <>
                                <FaUserCircle className="profile-page__avatar-icon" />
                                <div className="profile-page__joined-date">
                                    Joined: {profile.joinedDate}
                                </div>
                                <div className="profile-page__param-label">Username</div>
                                <div className="profile-page__param-box">{profile.username}</div>
                                <div className="profile-page__param-label">Description</div>
                                <div className="profile-page__param-box-description">
                                    {profile.description}
                                </div>
                                <div className="profile-page__param-label">Role</div>
                                <div className="profile-page__param-box">{profile.role}</div>
                                {currentProfileId === profile.id && (
                                    <button onClick={toggleEditMode} className="profile-page__edit-button">
                                        Edit
                                    </button>
                                )}
                            </>
                        ) : (
                            <ProfileUpdateForm
                                profile={profile}
                                toggleEditMode={toggleEditMode}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}