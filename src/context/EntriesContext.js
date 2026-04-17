'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('timelineEntries');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem('timelineEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  return useContext(EntriesContext);
}