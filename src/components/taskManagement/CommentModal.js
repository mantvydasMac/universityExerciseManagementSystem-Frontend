import React, { useState } from 'react';
import Modal from '../essentials/Modal';
import CommentDashboard from './CommentDashboard';
import './styles/CommentModal.css';

export default function CommentModal({ show, onClose, taskId, onSubmit, task }) {
    const [comment, setComment] = useState('');

    const handleSubmit = () => {

    };

    const footer = (
        <>
            <button
                className="modal-button modal-button--cancel"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                className="modal-button modal-button--confirm"
                onClick={handleSubmit}
                disabled={!comment.trim()}
            >
                Add Comment
            </button>
        </>
    );

    const title = (
        <div className="modal-title-content">
            <h2 id="comment-modal-title" className="modal-title-content__title">
                {task.title}
            </h2>
            <p className="modal-title-content__description">
                {task.description}
            </p>
        </div>
    );

    const comments = [
        {
            createdBy: 'john-doe',
            createdAt: '2025-05-16 12:00:00',
            comment: 'Another comment here.'
        },
        {
            createdBy: 'jane-smith',
            createdAt: '2025-05-16 13:30:15',
            comment: 'Great work on this task!'
        },
        {
            createdBy: 'alex-johnson',
            createdAt: '2025-05-16 14:45:30',
            comment: 'I have some suggestions for improvement. Let\'s discuss. I think we can enhance the user experience by adding more features. I would love to hear your thoughts on this. I believe it could make a significant difference in the overall functionality of the application.'
        },
        {
            createdBy: 'emily-davis',
            createdAt: '2025-05-16 15:10:00',
            comment: 'Looking forward to your feedback! Let me know if you need any help. I am here to assist you.'
        }
    ];

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={title}
            footer={footer}
            ariaLabelledBy="comment-modal-title"
        >
            <div className="comment-modal-content">
                <CommentDashboard comments={comments} />
                <div className="comment-form">
                    <textarea
                        className="comment-form__textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                        rows={4}
                        autoFocus
                    />
                </div>
            </div>
        </Modal>
    );
}