import React, { useState, useEffect } from 'react';
import Header from '../components/essentials/Header';
import GroupDashboard from '../components/groupManagement/GroupDashboard';
import CreateGroupModal from '../components/groupManagement/CreateGroupModal';
import OverflowMenu from '../components/essentials/OverflowMenu';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import { groupAPI } from '../api/groupAPI';
import './styles/GroupPage.css';

export default function GroupPage() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fabOpen, setFabOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const currentUserId = 1; // TODO: Replace with actual user ID from authentication system

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const fetchedGroups = await groupAPI.getUserGroups(currentUserId);
            setGroups(fetchedGroups);
            setError(null);
        } catch (err) {
            setError('Failed to load groups');
            console.error('Error loading groups:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFabMenu = e => {
        e.stopPropagation();
        setFabOpen(o => !o);
    };

    const closeFabMenu = () => setFabOpen(false);

    const handleCreateClick = () => {
        setShowCreateModal(true);
        setFabOpen(false);
    };

    const handleCreateGroup = async (name) => {
        try {
            setLoading(true);
            const newGroup = await groupAPI.createGroup(name, currentUserId);
            setGroups(prevGroups => [...prevGroups, newGroup]);
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
                    <p>Loading groups...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <GroupDashboard groups={groups} />
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

                <FloatingActionButton
                    ariaLabel="Add group"
                    icon="+"
                    onClick={toggleFabMenu}
                />
            </div>

            <CreateGroupModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateGroup}
            />
        </div>
    );
}