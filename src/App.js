import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import ProfilePage from "./pages/ProfilePage";
import {GroupsProvider} from "./context/GroupsContext";

function App() {
    return (
        <GroupsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<GroupPage />} />
                    <Route path="/groups/:groupId/tasks" element={<TaskPage />} />
                    <Route path="/profile/:profileId" element={<ProfilePage/>} />
                </Routes>
            </Router>
        </GroupsProvider>
    );
}

export default App;