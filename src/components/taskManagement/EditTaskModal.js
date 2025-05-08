import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../essentials/Modal';

export default function EditTaskModal({
                                          show,
                                          onClose,
                                          onSave,
                                          task = {},
                                          members = []
                                      }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('To Do');

    // when modal opens, populate fields from the task prop
    useEffect(() => {
        if (show && task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setDeadline(task.deadline || '');
            setAssignedTo(task.assignedTo || (members[0] || ''));
            setStatus(task.status || 'To Do');
        }
    }, [show, task, members]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!title || !deadline || !assignedTo || !status) return;
        const updated = {
            ...task,
            title,
            description,
            deadline,
            assignedTo,
            status
        };
        onSave(updated);
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
                Save Changes
            </button>
        </>
    );

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Edit Task"
            ariaLabelledBy="edit-task-modal"
            footer={footer}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor="edit-task-title">Title *</label>
                <input
                    id="edit-task-title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="edit-task-desc">Description</label>
                <textarea
                    id="edit-task-desc"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label htmlFor="edit-task-deadline">Deadline *</label>
                <input
                    id="edit-task-deadline"
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                />

                <label htmlFor="edit-task-assigned">Assign To *</label>
                <select
                    id="edit-task-assigned"
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

                <label htmlFor="edit-task-status">Status *</label>
                <select
                    id="edit-task-status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    required
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </form>
        </Modal>
    );
}

EditTaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        deadline: PropTypes.string,
        assignedTo: PropTypes.string,
        status: PropTypes.string
    }),
    members: PropTypes.arrayOf(PropTypes.string)
};