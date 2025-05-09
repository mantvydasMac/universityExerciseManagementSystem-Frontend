import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../essentials/Modal';

export default function TaskModal({
                                      show,
                                      onClose,
                                      onSubmit,
                                      task = {},
                                      members = [],
                                      mode = 'create'
                                  }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('To Do');

    useEffect(() => {
        if (show) {
            if (mode === 'edit' && task) {
                setTitle(task.title || '');
                setDescription(task.description || '');
                setDeadline(task.deadline || '');
                setAssignedTo(task.assignedTo || (members[0] || ''));
                setStatus(task.status || 'To Do');
            } else {
                // Reset fields for new task
                setTitle('');
                setDescription('');
                setDeadline('');
                setAssignedTo(members[0] || '');
                setStatus('To Do');
            }
        }
    }, [show, task, members, mode]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!title || !deadline || !assignedTo) return;

        if (mode === 'edit') {
            const updated = {
                ...task,
                title,
                description,
                deadline,
                assignedTo,
                status
            };
            onSubmit(updated);
        } else {
            const todayISO = new Date().toISOString().slice(0, 10);
            const newTask = {
                title,
                description,
                deadline,
                assignedTo,
                createdAt: todayISO,
                assignedAt: todayISO,
                status: 'To Do'
            };
            onSubmit(newTask);
        }
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
                {mode === 'edit' ? 'Save Changes' : 'Add Task'}
            </button>
        </>
    );

    const modalTitle = mode === 'edit' ? 'Edit Task' : 'Add New Task';
    const ariaLabelledBy = mode === 'edit' ? 'edit-task-modal' : 'add-task-modal';
    const fieldPrefix = mode === 'edit' ? 'edit-task' : 'task';

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={modalTitle}
            ariaLabelledBy={ariaLabelledBy}
            footer={footer}
        >
            <form onSubmit={handleSubmit}>
                <label htmlFor={`${fieldPrefix}-title`}>Title *</label>
                <input
                    id={`${fieldPrefix}-title`}
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <label htmlFor={`${fieldPrefix}-desc`}>Description</label>
                <textarea
                    id={`${fieldPrefix}-desc`}
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label htmlFor={`${fieldPrefix}-deadline`}>Deadline *</label>
                <input
                    id={`${fieldPrefix}-deadline`}
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                />

                <label htmlFor={`${fieldPrefix}-assigned`}>Assign To *</label>
                <select
                    id={`${fieldPrefix}-assigned`}
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

                {mode === 'edit' && (
                    <>
                        <label htmlFor={`${fieldPrefix}-status`}>Status *</label>
                        <select
                            id={`${fieldPrefix}-status`}
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            required
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </>
                )}
            </form>
        </Modal>
    );
}

TaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    task: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        deadline: PropTypes.string,
        assignedTo: PropTypes.string,
        status: PropTypes.string
    }),
    members: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.oneOf(['create', 'edit'])
};