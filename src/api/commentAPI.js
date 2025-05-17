export const commentAPI = {
    async fetchCommentsOfTask(taskId) {
        try {
            const response = await fetch(`/v1/comments/of-task/${taskId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            return await response.json();

        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
}