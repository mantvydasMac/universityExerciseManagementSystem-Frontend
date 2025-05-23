import React, { useState } from 'react';
import { FaUserCircle, FaEllipsisV, FaCommentAlt } from 'react-icons/fa';
import OverflowMenu from '../essentials/OverflowMenu';
import CommentModal from './CommentModal';
import { taskAPI } from '../../api/taskAPI';
import './styles/TaskCard.css';
import {useNavigate} from "react-router-dom";

export default function TaskCard({ task, onEdit, onDelete, profile }) {
    const { isLate, isDue, status, assignedToId, assignedDate } = task;
    const lateClass      = isLate      ? ' task-card--late'      : '';
    const dueClass       = isDue       ? ' task-card--due'       : '';
    const completedClass = status === 'COMPLETED' ? ' task-card--completed' : '';
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const toggleMenu = e => {
        e.stopPropagation();
        setMenuOpen(o => !o);
    };
    const closeMenu = () => setMenuOpen(false);

    const handleCommentClick = (e) => {
        e.stopPropagation();
        setShowCommentModal(true);
    };

    const handleDeleteClick = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await taskAPI.deleteTask(task.id);
            onDelete(task.id);
        } catch (err) {
            alert('Could not delete task. See console for details.');
        }
        setMenuOpen(false);
    };

    const items = [
        {
            label: 'Edit Task',
            onClick: () => { onEdit(task); setMenuOpen(false); }
        },
        {
            label: 'Delete Task',
            onClick: handleDeleteClick,
            danger: true
        }
    ];

    const handleClickAssigneeProfile = () => {
        if (assignedToId != null) {
            navigate(`/profile/${assignedToId}`);
        }
    }

    return (
        <>
            <div
                className={`task-card${lateClass}${dueClass}${completedClass}`}
                draggable
                onDragStart={e => e.dataTransfer.setData('text/plain', task.id)}
                onClick={closeMenu}
            >
                <div className="task-card__overflow">
                    <button
                        className="task-card__overflow-button"
                        aria-label="Task actions"
                        onClick={toggleMenu}
                    >
                        <FaEllipsisV />
                    </button>
                    <OverflowMenu
                        open={menuOpen}
                        placement="bottom"
                        items={items}
                    />
                </div>

                <div className="task-card__header">
                    <div className="task-card__avatar-container">
                        <FaUserCircle className="task-card__avatar-icon" onClick={handleClickAssigneeProfile} />
                        {assignedToId ? (
                            <div className="task-card__avatar-tooltip">
                                {/*<div className="tooltip__name">{profile.username}</div>*/}
                                <div className="tooltip__date">Assigned: {assignedDate}</div>
                            </div>
                        ) : (
                            <div className="task-card__avatar-tooltip">
                                <div className="tooltip__name">Unassigned</div>
                            </div>
                        )}
                    </div>
                    <h3 className="task-card__title" data-deadline={task.deadline}>
                        {task.title}
                    </h3>
                </div>

                <p className="task-card__desc">{task.description}</p>

                <div className="task-card__footer">
                    <ul className="task-card__meta">
                        <li><strong>Created:</strong> {task.createdDate}</li>
                        <li><strong>Deadline:</strong> {task.deadline != null ? task.deadline : "Not set"}</li>
                    </ul>
                    <button
                        className="task-card__comment-button"
                        aria-label="Add comment"
                        onClick={handleCommentClick}
                    >
                        <FaCommentAlt />
                    </button>
                </div>
            </div>

            <CommentModal
                show={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                taskId={task.id}
                task={task}
                profile={profile}
            />
        </>
    );
}