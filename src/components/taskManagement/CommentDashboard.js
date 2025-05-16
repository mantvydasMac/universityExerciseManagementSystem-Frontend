import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './styles/CommentDashboard.css';

export default function CommentDashboard({ comments }) {
    if (!comments || comments.length === 0) {
        return (
            <div className="comment-dashboard comment-dashboard--empty">
                No comments yet
            </div>
        );
    }

    return (
        <div className="comment-dashboard">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment__header">
                        <div className="comment__user">
                            <FaUserCircle className="comment__user-avatar" />
                            <span className="comment__username">{comment.createdBy}</span>
                        </div>
                        <span className="comment__timestamp">{comment.createdAt}</span>
                    </div>
                    <div className="comment__content">
                        {comment.comment}
                    </div>
                </div>
            ))}
        </div>
    );
}