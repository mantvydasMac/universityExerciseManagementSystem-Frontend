import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import TaskModal from '../components/taskManagement/TaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import { taskAPI } from '../api/taskAPI';
import { profilesAPI } from '../api/profilesAPI';
import { GroupsContext } from '../context/GroupsContext';
import CreateProfileModal from '../components/profileManagement/CreateProfileModal'; // You'll need to create this
import './styles/TaskPage.css';

export default function TaskPage() {
    const { groupId } = useParams();
    const { groups } = useContext(GroupsContext);
    const currentUserId = 3;

    const group = groups.find(g => g.id === parseInt(groupId, 10));
    const title = group ? `${group.name} tasks:` : 'Tasks:';

    const [tasks, setTasks] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [hasProfile, setHasProfile] = useState(null); // null = checking
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalMode, setModalMode] = useState('create');

    useEffect(() => {
        if (!group) return;

        const checkProfile = async () => {
            try {
                const fetchedProfiles = await profilesAPI.fetchProfilesOfGroup(group.id);
                setProfiles(fetchedProfiles);
                const profileExists = fetchedProfiles.some(p => p.userId === currentUserId);
                setHasProfile(profileExists);
                if (!profileExists) setShowProfileModal(true);
                else {
                    fetchTasks(group.id);
                }
            } catch (err) {
                console.error('Error loading profiles:', err);
                setHasProfile(false);
            }
        };

        checkProfile();
    }, [group]);

    const fetchTasks = async gid => {
        try {
            const fetchedTasks = await taskAPI.fetchTasksOfGroup(gid);
            setTasks(fetchedTasks);
        } catch (err) {
            console.error('Error loading tasks:', err);
        }
    };

    const handleProfileCreated = newProfile => {
        setProfiles(prev => [...prev, newProfile]);
        setHasProfile(true);
        setShowProfileModal(false);
        fetchTasks(group.id); // Now that user has a profile, fetch tasks
    };

    const handleAddTaskClick = e => {
        e.stopPropagation();
        setModalMode('create');
        setCurrentTask(null);
        setShowTaskModal(true);
    };
    const handleEditTask = t => {
        setCurrentTask(t);
        setModalMode('edit');
        setShowTaskModal(true);
    };
    const handleCloseTaskModal = () => {
        setShowTaskModal(false);
        if (modalMode === 'edit') setCurrentTask(null);
    };
    const handleSubmitTask = async data => {
        if (modalMode === 'edit') {
            const updated = await taskAPI.updateTask(data);
            setTasks(ts => ts.map(t => (t.id === updated.id ? updated : t)));
        } else {
            const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
            setTasks(ts => [...ts, { id: nextId, ...data }]);
        }
        setShowTaskModal(false);
    };

    if (hasProfile === null) {
        return <p>Checking your group profile...</p>;
    }

    return (
        <div className="task-page" onClick={() => showTaskModal && handleCloseTaskModal()}>
            <Header title={title} />
            <main className="task-page__main">
                {hasProfile ? (
                    <TaskDashboard tasks={tasks} profiles={profiles} onEdit={handleEditTask} />
                ) : (
                    <p style={{ color: 'red' }}>You must create a profile to access this group.</p>
                )}
            </main>
            {hasProfile && (
                <div className="fab-container" onClick={e => e.stopPropagation()}>
                    <FloatingActionButton ariaLabel="Add task" icon="+" onClick={handleAddTaskClick} />
                </div>
            )}
            <TaskModal
                show={showTaskModal}
                onClose={handleCloseTaskModal}
                onSubmit={handleSubmitTask}
                task={currentTask}
                profiles={profiles}
                mode={modalMode}
            />
            <CreateProfileModal
                show={showProfileModal}
                groupId={group?.id}
                userId={currentUserId}
                onClose={() => setShowProfileModal(false)}
                onCreate={handleProfileCreated}
            />
        </div>
    );
}
