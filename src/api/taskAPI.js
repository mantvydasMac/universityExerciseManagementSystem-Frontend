import { authAPI } from './authAPI';

export const taskAPI = {

    async fetchTasksOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/tasks/of-group/${groupId}`, {
                headers: authAPI.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            return await response.json();

        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    async updateTask(task) {
        try {

            const response = await fetch(`/v1/tasks`, {
                method: 'PUT',
                headers: authAPI.getAuthHeaders(),
                body: JSON.stringify(task)
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to update task: ${errorData}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    async createTask(task) {
        try {
            const response = await fetch(`/v1/tasks`, {
                method: 'POST',
                headers: authAPI.getAuthHeaders(),
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to create task: ${errorData}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

}