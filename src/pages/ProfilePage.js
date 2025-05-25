import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {profilesAPI} from "../api/profilesAPI";
import './styles/ProfilePage.css';
import {FaUserCircle} from "react-icons/fa";
import ProfileUpdateForm from "../components/profileManagement/ProfileUpdateForm";
import {authAPI} from "../api/authAPI";


export default function ProfilePage() {
    let {profileId} = useParams();
    profileId = parseInt(profileId, 10);

    const currentUserId = authAPI.getUserId();
    const [canEditProfile, setCanEditProfile] = useState(false);

    const [profile, setProfile] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getProfile(profileId);
        checkIfCanEditProfile(profileId);
    }, [profileId]);

    const checkIfCanEditProfile = async (profileId) => {
        try {
            const profiles = await profilesAPI.fetchProfilesByUser(currentUserId);
            const canEdit = profiles.some(profile => profile.id === profileId);
            setCanEditProfile(canEdit);
        } catch (error) {
            console.error('Error checking profile edit permissions:', error);
        }
    }

    const getProfile = async (profileId) => {
        try{
            const profile = await profilesAPI.fetchProfileById(profileId);
            console.log(profile);
            setProfile(profile);
        }
        catch(error) {
            console.error('Error loading profile:', error);
        }
    }

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    const handleSubmit = async (updatedProfile) => {
        try {
            const profile = await profilesAPI.updateProfile(updatedProfile);
            setProfile(profile);
        }
        catch (error) {
            console.error('Error updating profile:', error)
        }
    }


    return (
        <div className="profile-page">
            <div className="profile-page__customization">
                <div className="profile-page__customization-header">
                    <h2>Profile</h2>
                </div>

                {profile && (
                    <div className="profile-page__customization-body">
                        {!isEditMode ? (
                            <>
                                <FaUserCircle className="profile-page__avatar-icon"/>
                                <div className="profile-page__joined-date">Joined: {profile.joinedDate}</div>
                                <div className="profile-page__param-label">Username</div>
                                <div className="profile-page__param-box">{profile.username}</div>
                                <div className="profile-page__param-label">Description</div>
                                <div className="profile-page__param-box-description">{profile.description}</div>
                                <div className="profile-page__param-label">Role</div>
                                <div className="profile-page__param-box">{profile.role}</div>

                                {canEditProfile &&
                                    <button onClick={toggleEditMode} className="profile-page__edit-button">Edit</button>
                                }
                            </>
                        ) : (
                            <ProfileUpdateForm
                                profile={profile}
                                toggleEditMode={toggleEditMode}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}