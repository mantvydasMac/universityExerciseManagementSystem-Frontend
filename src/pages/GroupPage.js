import React, { useState } from 'react';
import Header from '../components/essentials/Header';
import GroupDashboard from '../components/groupManagement/GroupDashboard';
import CreateGroupModal from '../components/groupManagement/CreateGroupModal';
import OverflowMenu from '../components/essentials/OverflowMenu';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import initialGroups from './fillerData/Groups.js';
import './styles/GroupPage.css';

export default function GroupPage() {
    const [groups, setGroups] = useState(initialGroups);
    const [fabOpen, setFabOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleFabMenu = e => {
        e.stopPropagation();
        setFabOpen(o => !o);
    };

    const closeFabMenu = () => setFabOpen(false);

    const handleCreateClick = () => {
        setShowCreateModal(true);
        setFabOpen(false);
    };

    const handleCreateGroup = name => {
        const nextId = Math.max(...groups.map(g => g.id)) + 1;
        setGroups([...groups, { id: nextId, name }]);
    };

    return (
        <div className="group-page" onClick={closeFabMenu}>
            <Header title="Your groups:" />

            <main className="group-page__main">
                <GroupDashboard groups={groups} />
            </main>

            <div className="fab-container" onClick={e => e.stopPropagation()}>
                <OverflowMenu
                    open={fabOpen}
                    placement="top"
                    items={[
                        { label: 'Create Group', onClick: handleCreateClick },
                        { label: 'Join Group',   onClick: () => setFabOpen(false) }
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