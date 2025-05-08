import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/essentials/Header';
import TaskDashboard from '../components/taskManagement/TaskDashboard';
import initialGroups from './fillerData/Groups';
import initialTasks from './fillerData/Tasks';
import './styles/TaskPage.css';

export default function TaskPage() {
    const { groupId } = useParams();
    const group = initialGroups.find(g => g.id === parseInt(groupId, 10));
    const title = group ? `${group.name} tasks:` : 'Tasks:';

    return (
        <div className="task-page">
            <Header title={title} />
            <main className="task-page__main">
                <TaskDashboard tasks={initialTasks} />
            </main>
        </div>
    );
}