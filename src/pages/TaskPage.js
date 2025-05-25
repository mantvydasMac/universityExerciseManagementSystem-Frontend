import React, { useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import TaskModal from '../components/taskManagement/TaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import ProfileModal from '../components/profileManagement/ProfileModal';
import { taskAPI } from '../api/taskAPI';
import { groupAPI } from '../api/groupAPI';
import { profilesAPI } from '../api/profilesAPI';
import { GroupsContext } from '../context/GroupsContext';
import { FaUserCircle } from 'react-icons/fa';
import './styles/TaskPage.css';
import {authAPI} from "../api/authAPI";

export default function TaskPage() {
    const { groupId } = useParams();
    const gid = parseInt(groupId, 10);

    const { groups } = useContext(GroupsContext);
    const contextGroup = groups.find(g => g.id === gid);

    const currentUserId = Number(authAPI.getUserId());

    const [groupName, setGroupName] = useState(contextGroup?.name || '');
    const [tasks, setTasks] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalMode, setModalMode] = useState('create');
    const [currentProfileId, setCurrentProfileId] = useState(null);


    useEffect(() => {
        if (contextGroup) {
            setGroupName(contextGroup.name);
        } else if (gid) {
            (async () => {
                try {
                    const grp = await groupAPI.fetchGroupById(gid);
                    setGroupName(grp.name);
                } catch (_) {
                    setGroupName(`Group #${gid}`);
                }
            })();
        }
    }, [contextGroup, gid]);

    useEffect(() => {
        if (!gid) return;
        (async () => {
            try {
                const fetched = await taskAPI.fetchTasksOfGroup(gid);
                setTasks(fetched);
            } catch (err) {
                console.error('Error loading tasks:', err);
            }
        })();
    }, [gid]);

    useEffect(() => {
        if (!gid) return;
        (async () => {
            try {
                const fetched = await profilesAPI.fetchProfilesOfGroup(gid);
                setProfiles(fetched);
                const userProfile = fetched.find(p => p.userId === currentUserId);

                setCurrentProfileId(userProfile?.id || null);
            } catch (err) {
                console.error('Error loading profiles:', err);
            }
        })();
    }, [gid, currentUserId]);

    const handleAddTaskClick = e => {
        e.stopPropagation();
        setModalMode('create');
        setCurrentTask(null);
        setShowModal(true);
    };
    const handleEditTask = t => {
        setCurrentTask(t);
        setModalMode('edit');
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        if (modalMode === 'edit') setCurrentTask(null);
    };
    const handleSubmitTask = async data => {
        if (modalMode === 'edit') {
            const updated = await taskAPI.updateTask(data);
            setTasks(ts => ts.map(t => (t.id === updated.id ? updated : t)));
        } else {
            const createdTask = await taskAPI.createTask(data);
            setTasks(prev => [...prev, createdTask]);
        }
        setShowModal(false);
    };

    const handleOpenProfile = e => {
        e.stopPropagation();
        setShowProfileModal(true);
    };

    const handleCloseProfile = () => {
        setShowProfileModal(false);
    };

    return (
        <div className="task-page" onClick={() => showModal && handleCloseModal()}>
            <Header title={`${groupName} tasks:`} />
            <main className="task-page__main">
                <TaskDashboard tasks={tasks} profiles={profiles} onEdit={handleEditTask} />
            </main>
            <div className="fab-container" onClick={e => e.stopPropagation()}>
                <FloatingActionButton ariaLabel="Add task" icon="+" onClick={handleAddTaskClick} />
                <FloatingActionButton
                    className="task-page__profile-fab"
                    ariaLabel="View profile"
                    icon={<FaUserCircle />}
                    onClick={handleOpenProfile}
                />
            </div>

            {showModal && (
                <TaskModal
                    show={showModal}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitTask}
                    task={currentTask}
                    profiles={profiles}
                    mode={modalMode}
                    groupId={gid}
                    createdById={currentProfileId}
                />
            )}

            {showProfileModal && (
                <ProfileModal profileId={currentProfileId} onClose={handleCloseProfile} />
            )}
        </div>
    );
}