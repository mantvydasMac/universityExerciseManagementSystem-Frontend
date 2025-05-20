import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GroupPage />} />
                <Route path="/groups/:groupId/tasks" element={<TaskPage />} />
                <Route path="/profile/:profileId" element={<ProfilePage/>} />
            </Routes>
        </Router>
    );
}

export default App;