import {FaUserCircle} from "react-icons/fa";
import './styles/ProfileUpdateForm.css';
import React, {useEffect, useState} from "react";

export default function ProfileUpdateForm({profile, toggleEditMode, onSubmit}) {

    const [id, setId] = useState(null);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');
    const [joinedDate, setJoinedDate] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if(profile) {
            setId(profile.id || null);
            setUsername(profile.username || '');
            setDescription(profile.description || '');
            setRole(profile.role || '');
            setJoinedDate(profile.joinedDate || '');
        }
    }, [profile]);


    const handleSubmit = async () => {
        setErrorText('');
        setUsernameError(false);
        setDescriptionError(false);
        if (username.length === 0) {
            setErrorText("Username cannot be empty!");
            setUsernameError(true);

            return;
        }
        if (username.length >= 255) {
            setErrorText("Username cannot be more than 255 symbols!");
            setUsernameError(true);

            return;
        }
        if (description.length >= 255) {
            setErrorText("Description cannot be more than 255 symbols!");
            setDescriptionError(true);

            return;
        }

        const updatedProfile = {
            id,
            username,
            description
        }

        console.log(updatedProfile);

        await onSubmit(updatedProfile);
        toggleEditMode();
    }

    return (
        <>
            <FaUserCircle className="profile-update-form__avatar-icon"/>
            <div className="profile-update-form__joined-date">Joined: {joinedDate}</div>

            <form className="profile-update-form__edit-form">
                <label className="profile-update-form__input-label" htmlFor={`edit-username`}>Username</label>
                <input
                    className={"profile-update-form__input-box " + (usernameError ? "input-box-error" : "")}
                    id={'edit-username'}
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <label className="profile-update-form__input-label" htmlFor={`edit-description`}>Description</label>
                <textarea
                    className={"profile-update-form__input-box profile-update-form__input-box-description " + (descriptionError ? "input-box-error" : "")}
                    id={`edit-description`}
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <div className="profile-page__param-label">Role</div>
                <div className="profile-page__param-box">{profile.profileRole}</div>
            </form>

            <div className="profile-update-form__error-div">{errorText}</div>
            <button className="profile-update-form__cancel-button" onClick={toggleEditMode}>Cancel</button>
            <button className="profile-update-form__save-button" onClick={handleSubmit}>Save</button>
        </>
    );
}