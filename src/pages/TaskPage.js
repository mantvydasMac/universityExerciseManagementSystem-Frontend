import React, { useEffect, useState, useContext } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import TaskModal from '../components/taskManagement/TaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import { taskAPI } from '../api/taskAPI';
import { GroupsContext } from '../context/GroupsContext';
import './styles/TaskPage.css';
import {profilesAPI} from "../api/profilesAPI";
import {FaUserCircle} from "react-icons/fa";

export default function TaskPage() {
    const { groupId } = useParams();
    const { groups } = useContext(GroupsContext);

    const group = groups.find(g => g.id === parseInt(groupId, 10));
    const title = group ? `${group.name} tasks:` : 'Tasks:';

    const [tasks, setTasks] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalMode, setModalMode] = useState('create');
    const navigate = useNavigate();

    const currentProfileId = 1; // placeholder


    useEffect(() => {
        if (!group) return;
        fetchTasks(group.id);
        fetchProfiles(group.id);
    }, [group]);

    const fetchTasks = async gid => {
        try {
            const fetchedTasks = await taskAPI.fetchTasksOfGroup(gid);
            setTasks(fetchedTasks);
        } catch (err) {
            console.error('Error loading tasks:', err);
        }
    };

    const fetchProfiles = async gid => {
        try {
            const fetchedProfiles = await profilesAPI.fetchProfilesOfGroup(gid);
            setProfiles(fetchedProfiles);
        } catch (err) {
            console.error('Error loading profiles:', err);
        }
    };

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

    return (
        <div
            className="task-page"
            onClick={() => {
                if (showModal) handleCloseModal();
            }}
        >
            <Header title={title} />
            <main className="task-page__main">
                <TaskDashboard tasks={tasks} profiles={profiles} onEdit={handleEditTask} />
            </main>
            <div className="fab-container" onClick={e => e.stopPropagation()}>
                <FloatingActionButton ariaLabel="Add task" icon="+" onClick={handleAddTaskClick} />
                <FloatingActionButton
                    className="task-page__profile-fab"
                    ariaLabel="View profile"
                    icon={<FaUserCircle/>}
                    onClick={() => navigate(`/profile/${currentProfileId}`)}
                />
            </div>
            <TaskModal
                show={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitTask}
                task={currentTask}
                profiles={profiles}
                mode={modalMode}
                groupId={groupId}
                createdById={1} //placeholder
            />
        </div>
    );
}