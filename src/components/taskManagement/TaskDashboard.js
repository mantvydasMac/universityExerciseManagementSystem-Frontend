import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './styles/TaskDashboard.css';

export default function TaskDashboard({ tasks }) {
    const [taskList, setTaskList] = useState(tasks);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        setTaskList(prev =>
            prev.map(t =>
                t.id.toString() === id
                    ? { ...t, status: newStatus }
                    : t
            )
        );
    };

    const toDo       = [];
    const inProgress = [];
    const completed  = [];

    taskList.forEach(task => {
        const d = new Date(task.deadline);
        const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const isLate = day < today && task.status !== 'Completed';
        const isDue  = day.getTime() === today.getTime() && task.status !== 'Completed';
        const enriched = { ...task, isLate, isDue };

        switch (task.status) {
            case 'To Do':       toDo.push(enriched); break;
            case 'In Progress': inProgress.push(enriched); break;
            case 'Completed':   completed.push(enriched); break;
            default: break;
        }
    });

    const columns = [
        { title: 'To Do',       items: toDo },
        { title: 'In Progress', items: inProgress },
        { title: 'Completed',   items: completed },
    ];

    return (
        <section className="task-dashboard">
            <div className="task-dashboard__columns">
                {columns.map(col => (
                    <div
                        key={col.title}
                        className="task-dashboard__column"
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, col.title)}
                    >
                        <h3 className="task-dashboard__column-header">{col.title}</h3>
                        {col.items.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {col.items.length === 0 && (
                            <p className="task-dashboard__empty">No tasks here</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}