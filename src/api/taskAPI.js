export const taskAPI = {

    async fetchTasksOfGroup(groupId) {
        try {
            const response = await fetch(`/v1/tasks/of-group/${groupId}`);
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
                headers: {
                    'Content-Type': 'application/json',
                },
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
    },

    async deleteTask(taskId) {
        try {
            const response = await fetch(`/v1/tasks/${taskId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to delete task: ${errorData}`);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
};