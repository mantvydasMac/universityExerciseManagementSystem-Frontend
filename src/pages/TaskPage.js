import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import TaskModal from '../components/taskManagement/TaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import initialGroups from './fillerData/Groups';
import initialTasks from './fillerData/Tasks';
import './styles/TaskPage.css';

export default function TaskPage() {
    const { groupId } = useParams();
    const group = initialGroups.find(g => g.id === parseInt(groupId, 10));
    const title = group ? `${group.name} tasks:` : 'Tasks:';

    const [tasks, setTasks] = useState(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalMode, setModalMode] = useState('create');

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

    const handleSubmitTask = taskData => {
        if (modalMode === 'edit') {
            setTasks(prev =>
                prev.map(t => (t.id === taskData.id ? taskData : t))
            );
        } else {
            const nextId = tasks.length
                ? Math.max(...tasks.map(t => t.id)) + 1
                : 1;
            setTasks(prev => [...prev, { id: nextId, ...taskData }]);
        }
        setShowModal(false);
    };

    const memberNames = Array.from(
        new Set(tasks.map(t => t.assignedTo).filter(Boolean))
    );

    return (
        <div className="task-page" onClick={() => {
            if (showModal) handleCloseModal();
        }}>
            <Header title={title} />

            <main className="task-page__main">
                <TaskDashboard
                    tasks={tasks}
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
                members={memberNames}
                mode={modalMode}
            />
        </div>
    );
}