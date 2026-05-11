import { createContext, useContext, useState } from 'react';
import { user } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [joinedGroups, setJoinedGroups] = useState(new Set(user.joinedGroups));

  function toggleGroup(groupId) {
    setJoinedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  return (
    <AppContext.Provider value={{ joinedGroups, toggleGroup }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
