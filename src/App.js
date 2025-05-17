import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import {GroupsProvider} from "./context/GroupsContext";

function App() {
    return (
        <GroupsProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<GroupPage />} />
                    <Route path="/groups/:groupId/tasks" element={<TaskPage />} />
                </Routes>
            </Router>
        </GroupsProvider>
    );
}

export default App;