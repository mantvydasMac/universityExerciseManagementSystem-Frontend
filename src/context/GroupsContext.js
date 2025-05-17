import React, { createContext, useState } from 'react';

export const GroupsContext = createContext({
    groups: [],
    setGroups: () => {}
});

export function GroupsProvider({ children }) {
    const [groups, setGroups] = useState([]);
    return (
        <GroupsContext.Provider value={{ groups, setGroups }}>
            {children}
        </GroupsContext.Provider>
    );
}