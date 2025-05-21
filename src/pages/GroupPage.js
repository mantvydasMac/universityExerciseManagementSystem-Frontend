import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/essentials/Header';
import GroupDashboard from '../components/groupManagement/GroupDashboard';
import CreateGroupModal from '../components/groupManagement/CreateGroupModal';
import OverflowMenu from '../components/essentials/OverflowMenu';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import { groupAPI } from '../api/groupAPI';
import { GroupsContext } from '../context/GroupsContext';
import TimelineView from '../components/timeline/TimelineView';
import './styles/GroupPage.css';

export default function GroupPage() {
    const { groups: ctxGroups, setGroups: setCtxGroups } = useContext(GroupsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fabOpen, setFabOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const currentUserId = 1; // TODO: Replace with actual user ID from authentication system

    useEffect(() => {
        async function loadGroups() {
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
        }
        loadGroups();
    }, [currentUserId, setCtxGroups]);

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

    return (
        <div className="group-page" onClick={closeFabMenu}>
            <Header title="Your groups:" />
            <main className="group-page__main">
                {loading ? (
                    <p>Loading groups…</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <>
                        <TimelineView groups={ctxGroups} currentUserId={currentUserId} />
                        <GroupDashboard groups={ctxGroups} />
                    </>
                )}
            </main>
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
        </div>
    );
}