import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {profilesAPI} from "../api/profilesAPI";
import './styles/ProfilePage.css';
import {FaUserCircle} from "react-icons/fa";


export default function ProfilePage() {
    let {profileId} = useParams();
    profileId = parseInt(profileId, 10);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile(profileId);
    }, []);

    const getProfile = async (profileId) => {
        try{
            const profile = await profilesAPI.getProfileById(profileId);
            setProfile(profile);
        }
        catch(error) {
            console.error('Error loading group:', error);
        }
    }


    return (
        <div className="profile-page">
            <div className="profile-page__customization">
                <div className="profile-page__customization-header">
                    <h2>Profile</h2>
                </div>


                <div className="profile-page__customization-body">
                    {profile && (
                        <>
                            <FaUserCircle className="profile-page__avatar-icon"/>
                            <div className="profile-page__joined-date">Joined: {profile.joinedDate}</div>
                            <div className="profile-page__param-label">Username</div>
                            <div className="profile-page__param-box">{profile.username}</div>
                            <div className="profile-page__param-label">Description</div>
                            <div className="profile-page__param-box-description">{profile.description}</div>
                            <div className="profile-page__param-label">Role</div>
                            <div className="profile-page__param-box">{profile.role}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}