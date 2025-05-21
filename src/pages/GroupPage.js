import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/essentials/Header';
import GroupDashboard from '../components/groupManagement/GroupDashboard';
import CreateGroupModal from '../components/groupManagement/CreateGroupModal';
import OverflowMenu from '../components/essentials/OverflowMenu';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import { groupAPI } from '../api/groupAPI';
import { GroupsContext } from '../context/GroupsContext';
import './styles/GroupPage.css';
import {invitationAPI} from "../api/invitationAPI";
import InvitationsPanel from "../components/invitationManagement/Invitations";
import CreateProfileModal from "../components/profileManagement/CreateProfileModal";

export default function GroupPage() {
    const { groups: ctxGroups, setGroups: setCtxGroups } = useContext(GroupsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fabOpen, setFabOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [invitations, setInvitations] = useState([]);

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [joinedGroupId, setJoinedGroupId] = useState(null);

    const currentUserId = 5; // TODO: Replace with actual user ID from authentication system

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const fetched = await groupAPI.getUserGroups(currentUserId);
            setCtxGroups(fetched);
            setError(null);
        } catch (err) {
            console.error('Error loading groups:', err);
            setError('Failed to load groups');
        } finally {
            setLoading(false);
        }
    };

    // const fetchJoinedGroup = async (joinedGroupId) => {
    //     try {
    //         setLoading(true);
    //         const joinedGroup = await groupAPI.getGroupById(joinedGroupId);
    //         setCtxGroups(prev => [...prev, joinedGroup]);
    //         setError(null);
    //     } catch (err) {
    //         console.error('Error loading joined group:', err);
    //         setError('Failed to load joined group');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const toggleFabMenu = e => {
        e.stopPropagation();
        setFabOpen(o => !o);
    };
    const closeFabMenu = () => setFabOpen(false);

    const handleCreateClick = () => {
        setShowCreateModal(true);
        setFabOpen(false);
    };

    const handleCreateGroup = async name => {
        try {
            setLoading(true);
            const newGroup = await groupAPI.createGroup(name, currentUserId);
            setCtxGroups(prev => [...prev, newGroup]);
            setShowCreateModal(false);
        } catch (err) {
            console.error('Error creating group:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileCreated = () => {
        setShowProfileModal(false);
        fetchGroups();
    };

    return (
        <div className="group-page" onClick={closeFabMenu}>
            <Header title="Your groups:" />
            <main className="group-page__main">
                {loading ? (
                    <p>Loading groups…</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <GroupDashboard groups={ctxGroups} />
                )}
            </main>
            <InvitationsPanel
                userId={currentUserId}
                onAccepted={(joinedGroupId) => {
                    // setJoinedGroupId(joinedGroupId);
                    setJoinedGroupId(joinedGroupId);
                    setShowProfileModal(true);
                }}
            />
            <div className="fab-container" onClick={e => e.stopPropagation()}>
                <OverflowMenu
                    open={fabOpen}
                    placement="top"
                    items={[
                        { label: 'Create Group', onClick: handleCreateClick },
                        { label: 'Join Group', onClick: () => setFabOpen(false) }
                    ]}
                />
                <FloatingActionButton ariaLabel="Add group" icon="+" onClick={toggleFabMenu} />
            </div>
            <CreateGroupModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateGroup}
            />
            <CreateProfileModal
                show={showProfileModal}
                groupId={joinedGroupId}
                userId={currentUserId}
                onClose={() => setShowProfileModal(false)}
                onCreate={handleProfileCreated}
            />
        </div>
    );
}