import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { profilesAPI } from '../../api/profilesAPI';
import './styles/CommentDashboard.css';

export default function CommentDashboard({ comments, currentProfileId }) {
    const [profiles, setProfiles] = useState({});

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!comments || comments.length === 0) return;

            const uniqueIds = [...new Set(comments.map(c => c.profileId))];
            const missing = uniqueIds.filter(id => !profiles[id]);
            if (missing.length === 0) return;

            try {
                const fetched = {};
                for (const id of missing) {
                    const profile = await profilesAPI.fetchProfileById(id);
                    fetched[id] = profile;
                }
                setProfiles(prev => ({ ...prev, ...fetched }));
            } catch (err) {
                console.error('Error fetching profiles:', err);
            }
        };

        fetchProfiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments]);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    useEffect(() => {
        console.log('Incoming comments:', comments);
    }, [comments]);

    if (!comments || comments.length === 0) {
        return (
            <div className="comment-dashboard comment-dashboard--empty">
                No comments yet
            </div>
        );
    }

    return (
        <div className="comment-dashboard">
            {comments.map((comment, i) => {
                const isMe = comment.profileId === currentProfileId;
                const profile = profiles[comment.profileId];
                const name = profile ? profile.username : 'Loading…';

                return (
                    <div
                        key={comment.id || i}
                        className={`comment${isMe ? ' comment--current-user' : ''}`}
                    >
                        <div className="comment__header">
                            <div className="comment__user">
                                <FaUserCircle className="comment__user-avatar" />
                                <span className="comment__username">
                                  {isMe ? 'You' : name}
                                </span>
                            </div>
                            <span className="comment__timestamp">
                                    {formatDateTime(comment.createdAt)}
                            </span>
                        </div>
                        <div className="comment__content">
                            {comment.content ?? comment.comment}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}