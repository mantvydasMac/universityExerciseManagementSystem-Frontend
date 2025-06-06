import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import GroupPage from './pages/GroupPage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import { GroupsProvider } from "./context/GroupsContext";
import {authAPI} from "./api/authAPI";

const PrivateRoute = ({ children }) => {
    const token = authAPI.getToken();
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <GroupsProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <GroupPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/groups/:groupId/tasks"
                        element={
                            <PrivateRoute>
                                <TaskPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </GroupsProvider>
    );
}

export default App;