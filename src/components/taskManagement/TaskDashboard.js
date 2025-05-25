import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import './styles/TaskDashboard.css';
import {taskAPI} from "../../api/taskAPI";

export default function TaskDashboard({ tasks, profiles, onEdit, fetchTasks, toggleNotification, setNotificationText }) {
    const [taskList, setTaskList] = useState(tasks);
    const [isDragging, setIsDragging] = useState(false);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);


    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = async (e, newStatusLabel) => {
        setIsDragging(false);
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const newStatus = statusLabelToEnum[newStatusLabel];
        if (!newStatus) {
            console.error('Unknown status:', newStatusLabel);
            return;
        }

        const taskToUpdate = taskList.find(task => task.id.toString() === id);
        if (!taskToUpdate) return;

        const updatedTask = { ...taskToUpdate, status: newStatus };

        try {
            const result = await taskAPI.updateTask(updatedTask);
            if (result.conflict) {
                fetchTasks();
                setNotificationText("Task has already been moved.");
                toggleNotification();
            } else {
                const updatedFromServer = result.data;
                setTaskList(prev =>
                    prev.map(t =>
                        t.id.toString() === id
                            ? updatedFromServer
                            : t
                    )
                );
            }
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    const toDo       = [];
    const inProgress = [];
    const completed  = [];

    const handleDelete = deletedId => {
        setTaskList(prev => prev.filter(t => t.id !== deletedId));
    };

    taskList.forEach(task => {
        let isLate = null;
        let isDue = null;

        if (task.deadline != null) {
            const d = new Date(task.deadline);
            const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            isLate = day < today && task.status !== 'Completed';
            isDue  = day.getTime() === today.getTime() && task.status !== 'Completed';
        }


        const enriched = { ...task, isLate, isDue };

        switch (task.status) {
            case 'TO_DO':       toDo.push(enriched); break;
            case 'IN_PROGRESS': inProgress.push(enriched); break;
            case 'COMPLETED':   completed.push(enriched); break;
            default: break;
        }
    });
    const statusLabelToEnum = {
        'To Do': 'TO_DO',
        'In Progress': 'IN_PROGRESS',
        'Completed': 'COMPLETED',
        'Late': 'LATE',
    };

    const columns = [
        { title: 'To Do',       items: toDo },
        { title: 'In Progress', items: inProgress },
        { title: 'Completed',   items: completed },
    ];

    const handleDragEnterDashboard = e => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeaveDashboard = e => {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    };

    return (
    <section className="task-dashboard">
        <div
            className={`task-dashboard__columns ${isDragging ? 'task-dashboard__columns--dragging' : ''}`}
            onDragEnter={handleDragEnterDashboard}
            onDragLeave={handleDragLeaveDashboard}
        >
            {columns.map(col => (
                <div
                    key={col.title}
                    className="task-dashboard__column"
                    onDragOver={handleDragOver}
                    onDrop={e => handleDrop(e, col.title)}
                >
                    <h3 className="task-dashboard__column-header">{col.title}</h3>
                    {col.items.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            profile={profiles.find(p => p.id === task.assignedToId)}
                            onEdit={onEdit}
                            onDelete={handleDelete}    // pass delete callback
                        />                    ))}
                    {col.items.length === 0 && (
                        <p className="task-dashboard__empty">No tasks here</p>
                    )}
                </div>
            ))}
        </div>
    </section>
    );
}