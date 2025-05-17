import React, { useState, useEffect } from 'react';
import Modal from '../essentials/Modal';
import CommentDashboard from './CommentDashboard';
import { commentAPI } from '../../api/commentAPI';
import './styles/CommentModal.css';

export default function CommentModal({ show, onClose, taskId, onSubmit, task }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadComments = async () => {
            if (show && taskId) {
                setLoading(true);
                try {
                    const fetchedComments = await commentAPI.fetchCommentsOfTask(taskId);
                    setComments(fetchedComments);
                    setError(null);
                } catch (err) {
                    setError('Failed to load comments');
                    console.error('Error loading comments:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadComments();
    }, [show, taskId]);

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

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={title}
            footer={footer}
            ariaLabelledBy="comment-modal-title"
        >
            <div className="comment-modal-content">
                {loading ? (
                    <div>Loading comments...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <CommentDashboard comments={comments} />
                )}
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