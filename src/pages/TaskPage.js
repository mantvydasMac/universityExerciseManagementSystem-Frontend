import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import TaskModal from '../components/taskManagement/TaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import {taskAPI} from '../api/taskAPI';
import './styles/TaskPage.css';
import {profilesAPI} from "../api/profilesAPI";
import {groupAPI} from "../api/groupAPI";

export default function TaskPage() {
    let { groupId } = useParams();
    groupId = parseInt(groupId, 10);

    const [group, setGroup] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalMode, setModalMode] = useState('create');


    useEffect(() => {
        fetchTasks(groupId);
        fetchProfiles(groupId);
        getGroup(groupId)
    }, []);

    const fetchTasks = async (groupId) => {
        try{
            const fetchedTasks = await taskAPI.fetchTasksOfGroup(groupId);
            setTasks(fetchedTasks);
        }
        catch(error) {
            console.error('Error loading tasks:', error);
        }
    }

    const fetchProfiles = async (groupId) => {
        try{
            const fetchedProfiles = await profilesAPI.fetchProfilesOfGroup(groupId);
            setProfiles(fetchedProfiles);
        }
        catch(error) {
            console.error('Error loading profiles:', error);
        }
    }

    const getGroup = async (groupId) => {
        try{
            const group = await groupAPI.getGroupById(groupId);
            setGroup(group);
        }
        catch(error) {
            console.error('Error loading group:', error);
        }
    }

    const handleAddTaskClick = e => {
        e.stopPropagation();
        setModalMode('create');
        setCurrentTask(null);
        setShowModal(true);
    };

    const handleEditTask = task => {
        setCurrentTask(task);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalMode === 'edit') {
            setCurrentTask(null);
        }
    };

    const handleSubmitTask = async taskData => {
        if (modalMode === 'edit') {
            let updatedTask = await taskAPI.updateTask(taskData);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );
        } else {
            const nextId = tasks.length
                ? Math.max(...tasks.map(t => t.id)) + 1
                : 1;
            setTasks(prev => [...prev, { id: nextId, ...taskData }]);
        }
        setShowModal(false);
    };

    // const memberNames = Array.from(
    //     new Set(tasks.map(t => t.assignedTo).filter(Boolean))
    // );

    return (
        <div className="task-page" onClick={() => {
            if (showModal) handleCloseModal();
        }}>
            <Header title={group === null ? "" : group.name} />

            <main className="task-page__main">
                <TaskDashboard
                    tasks={tasks}
                    profiles={profiles}
                    onEdit={handleEditTask}
                />
            </main>

            <div className="fab-container" onClick={e => e.stopPropagation()}>
                <FloatingActionButton
                    ariaLabel="Add task"
                    icon="+"
                    onClick={handleAddTaskClick}
                />
            </div>

            <TaskModal
                show={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitTask}
                task={currentTask}
                profiles={profiles}
                mode={modalMode}
            />
        </div>
    );
}