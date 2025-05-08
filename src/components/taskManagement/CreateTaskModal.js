import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../essentials/Modal';

export default function CreateTaskModal({
                                            show,
                                            onClose,
                                            onCreate,
                                            members = []
                                        }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState(members[0] || '');

    useEffect(() => {
        if (show) {
            setTitle('');
            setDescription('');
            setDeadline('');
            setAssignedTo(members[0] || '');
        }
    }, [show, members]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!title || !deadline || !assignedTo) return;

        const todayISO = new Date().toISOString().slice(0, 10);
        onCreate({
            title,
            description,
            deadline,
            assignedTo,
            createdAt: todayISO,
            assignedAt: todayISO,
            status: 'To Do'
        });
        onClose();
    };

    const footer = (
        <>
            <button
                type="button"
                className="modal-button modal-button--cancel"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="button"
                className="modal-button modal-button--confirm"
                onClick={handleSubmit}
            >
                Add Task
            </button>
        </>
    );

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Add New Task"
            ariaLabelledBy="add-task-modal"
            footer={footer}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-title">Title *</label>
                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="task-desc">Description</label>
                <textarea
                    id="task-desc"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label htmlFor="task-deadline">Deadline *</label>
                <input
                    id="task-deadline"
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                />

                <label htmlFor="task-assigned">Assign To *</label>
                <select
                    id="task-assigned"
                    value={assignedTo}
                    onChange={e => setAssignedTo(e.target.value)}
                    required
                >
                    {members.map(name => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </form>
        </Modal>
    );
}

CreateTaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    members: PropTypes.arrayOf(PropTypes.string)
};