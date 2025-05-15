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
                body: task
            });


        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }
}