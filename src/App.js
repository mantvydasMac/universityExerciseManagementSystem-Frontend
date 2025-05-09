import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GroupPage />} />
                <Route path="/groups/:groupId/tasks" element={<TaskPage />} />
            </Routes>
        </Router>
    );
}

export default App;