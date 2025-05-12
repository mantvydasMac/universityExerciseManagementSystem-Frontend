import React, { useState, useEffect } from 'react';
import Modal from '../essentials/Modal';

export default function CreateGroupModal({ show, onClose, onCreate }) {
    const [groupName, setGroupName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            setGroupName('');
            setIsSubmitting(false);
            setError(null);
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = groupName.trim();
        if (name && !isSubmitting) {
            setIsSubmitting(true);
            setError(null);
            try {
                await onCreate(name);
                onClose();
            } catch (error) {
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Create New Group"
            ariaLabelledBy="create-group-title"
        >
            <form onSubmit={handleSubmit} className="create-group-form">
                <div className="form-group">
                    <label htmlFor="group-name">Group Name</label>
                    <input
                        id="group-name"
                        type="text"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                        placeholder="e.g. CHEM-707"
                        required
                        autoFocus
                        disabled={isSubmitting}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="modal-footer">
                    <button
                        type="button"
                        className="modal-button modal-button--cancel"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="modal-button modal-button--confirm"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}