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
    },

    async createComment(commentDto) {
        try {
            const response = await fetch('/v1/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentDto),
            });
            if (!response.ok) {
                throw new Error('Failed to create comment');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }
};