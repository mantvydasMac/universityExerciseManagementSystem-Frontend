import React, { useState, useEffect } from 'react';
import Modal from '../essentials/Modal';

export default function CreateGroupModal({ show, onClose, onCreate }) {
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        if (show) setGroupName('');
    }, [show]);

    const handleSubmit = e => {
        e.preventDefault();
        const name = groupName.trim();
        if (name) {
            onCreate(name);
            onClose();
        }
    };

    const footer = (
        <>
            <button type="button" className="modal-button modal-button--cancel" onClick={onClose}>
                Cancel
            </button>
            <button type="submit" className="modal-button modal-button--confirm">
                Create
            </button>
        </>
    );

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Create New Group"
            ariaLabelledBy="create-group-title"
            footer={footer}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="group-name">Group Name</label>
                <input
                    id="group-name"
                    type="text"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    placeholder="e.g. CHEM-707"
                    required
                    autoFocus
                />
            </form>
        </Modal>
    );
}