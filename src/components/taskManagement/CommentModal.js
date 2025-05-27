import React, { useState, useEffect } from 'react';
import Modal from '../essentials/Modal';
import CommentDashboard from './CommentDashboard';
import { commentAPI } from '../../api/commentAPI';
import './styles/CommentModal.css';

export default function CommentModal({ show, onClose, taskId, onSubmit, task, currentProfileId }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

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

    const handleSubmit = async () => {
        const trimmed = comment.trim();
        if (!trimmed) return;
        if (trimmed.length > 255) {
            setSubmitError('Comment must be 255 characters or less.');
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const newCommentDto = {
                content: trimmed,
                taskId: taskId,
                profileId: currentProfileId,
            };
            await commentAPI.createComment(newCommentDto);
            const updatedComments = await commentAPI.fetchCommentsOfTask(taskId);
            setComments(updatedComments);
            setComment('');
            if (onSubmit) onSubmit();
        } catch (err) {
            console.error('Error creating comment:', err);
            setSubmitError('Failed to add comment');
        } finally {
            setSubmitting(false);
        }
    };

    const footer = (
        <>
            <button
                className="modal-button modal-button--cancel"
                onClick={onClose}
                disabled={submitting}
            >
                Cancel
            </button>
            <button
                className="modal-button modal-button--confirm"
                onClick={handleSubmit}
                disabled={
                    submitting ||
                    !comment.trim() ||
                    comment.trim().length > 255
                }
            >
                {submitting ? 'Adding…' : 'Add Comment'}
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
                    <CommentDashboard comments={comments} currentProfileId={currentProfileId} />
                )}

                <div className="comment-form">
          <textarea
              className="comment-form__textarea"
              value={comment}
              onChange={e => {
                  setComment(e.target.value);
                  setSubmitError(null);
              }}
              placeholder="Write your comment here..."
              rows={4}
              autoFocus
              disabled={submitting}
          />
                    {comment.length > 255 && (
                        <div className="error-message">
                            Comment must be 255 characters or less.
                        </div>
                    )}
                    {submitError && (
                        <div className="error-message">{submitError}</div>
                    )}
                </div>
            </div>
        </Modal>
    );
}