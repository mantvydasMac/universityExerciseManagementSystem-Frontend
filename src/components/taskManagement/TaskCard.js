import React, { useState } from 'react';
import { FaUserCircle, FaEllipsisV, FaCommentAlt } from 'react-icons/fa';
import OverflowMenu from '../essentials/OverflowMenu';
import CommentModal from './CommentModal';
import './styles/TaskCard.css';

export default function TaskCard({ task, onEdit }) {
    const { isLate, isDue, status, assignedTo, assignedAt } = task;
    const lateClass      = isLate      ? ' task-card--late'      : '';
    const dueClass       = isDue       ? ' task-card--due'       : '';
    const completedClass = status === 'Completed' ? ' task-card--completed' : '';

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

    const handleCommentSubmit = (commentData) => {

    };

    const items = [
        {
            label: 'Edit Task',
            onClick: () => { onEdit(task); setMenuOpen(false); }
        },
        {
            label: 'Delete Task',
            onClick: () => { setMenuOpen(false); },
            danger: true
        }
    ];

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
                        <FaUserCircle className="task-card__avatar-icon" />
                        <div className="task-card__avatar-tooltip">
                            <div className="tooltip__name">{assignedTo}</div>
                            <div className="tooltip__date">Assigned: {assignedAt}</div>
                        </div>
                    </div>
                    <h3 className="task-card__title" data-deadline={task.deadline}>
                        {task.title}
                    </h3>
                </div>

                <p className="task-card__desc">{task.description}</p>

                <div className="task-card__footer">
                    <ul className="task-card__meta">
                        <li><strong>Created:</strong> {task.createdAt}</li>
                        <li><strong>Deadline:</strong> {task.deadline}</li>
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
                onSubmit={handleCommentSubmit}
                task={task}
            />
        </>
    );
}