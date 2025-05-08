import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import CreateTaskModal from '../components/taskManagement/CreateTaskModal';
import EditTaskModal from '../components/taskManagement/EditTaskModal';
import FloatingActionButton from '../components/essentials/FloatingActionButton';
import initialGroups from './fillerData/Groups';
import initialTasks from './fillerData/Tasks';
import './styles/TaskPage.css';

export default function TaskPage() {
    const { groupId } = useParams();
    const group = initialGroups.find(g => g.id === parseInt(groupId, 10));
    const title = group ? `${group.name} tasks:` : 'Tasks:';

    const [tasks, setTasks] = useState(initialTasks);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const handleAddTaskClick = e => {
        e.stopPropagation();
        setShowCreateModal(true);
    };
    const handleCloseCreate = () => setShowCreateModal(false);
    const handleCreateTask = newTask => {
        const nextId = tasks.length
            ? Math.max(...tasks.map(t => t.id)) + 1
            : 1;
        setTasks(prev => [...prev, { id: nextId, ...newTask }]);
        setShowCreateModal(false);
    };

    const handleEditTask = task => {
        setCurrentTask(task);
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
        setCurrentTask(null);
    };
    const handleSaveTask = updated => {
        setTasks(prev =>
            prev.map(t => (t.id === updated.id ? updated : t))
        );
        handleCloseEdit();
    };

    // extract unique "assignedTo" names for selectors
    const memberNames = Array.from(
        new Set(tasks.map(t => t.assignedTo).filter(Boolean))
    );

    return (
        <div className="task-page" onClick={() => {
            if (showCreateModal) handleCloseCreate();
            if (showEditModal) handleCloseEdit();
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

            <CreateTaskModal
                show={showCreateModal}
                onClose={handleCloseCreate}
                onCreate={handleCreateTask}
                members={memberNames}
            />

            <EditTaskModal
                show={showEditModal}
                onClose={handleCloseEdit}
                onSave={handleSaveTask}
                task={currentTask}
                members={memberNames}
            />
        </div>
    );
}