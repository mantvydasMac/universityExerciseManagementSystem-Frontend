import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../essentials/Modal';

export default function TaskModal({
                                      show,
                                      onClose,
                                      onSubmit,
                                      task = {},
                                      profiles = [],
                                      mode = 'create',
                                      groupId,
                                      createdById
                                  }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedToId, setAssignedToId] = useState(-1);
    // const [status, setStatus] = useState('To Do');
    const [id, setId] = useState(0);
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        if (show) {
            if (mode === 'edit' && task) {
                setId(task.id || 0);
                setTitle(task.title || '');
                setDescription(task.description || '');
                setDeadline(task.deadline || '');
                setAssignedToId(task.assignedToId || -1);
                // setStatus(task.status || 'To Do');
            } else {
                // Reset fields for new task
                setTitle('');
                setDescription('');
                setDeadline('');
                setAssignedToId(-1);
                // setStatus('To Do');
            }
        }
    }, [show, task, mode]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!title.trim()) {
            setTitleError('Title is required');
            return;
        }
        if (title.length > 50) {
            setTitleError('Title must be less than 50 characters');
            return;
        }

        setTitleError('');
        let shouldClose;

        if (mode === 'edit') {

            const updated = {
                id,
                title,
                description,
                deadline: deadline === "" ? null : deadline,
                assignedToId: assignedToId === -1 ? null : assignedToId,
                version: task.version
                // status
            };
            console.log(updated);
            shouldClose = await onSubmit(updated);
        } else {
            const newTask = {
                title,
                description,
                deadline: deadline === "" ? null : deadline,
                assignedToId: assignedToId === -1 ? null : assignedToId,
                groupId,
                createdById
            };
            console.log(newTask);
            shouldClose = await onSubmit(newTask);
        }
        if (shouldClose) {
            onClose();
        }
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
                {titleError && <p className="error">{titleError}</p>}

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
                    value={assignedToId}
                    onChange={e => setAssignedToId(parseInt(e.target.value, 10))}
                    required
                >
                    <option key={-1} value={-1}>
                        Unassigned
                    </option>
                    {profiles.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.username}
                        </option>
                    ))}
                </select>

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