import React, { useCallback, useState } from 'react';

const useSearchHistory = () => {
  const isStorage = localStorage.getItem('searchHistory');
  const initialState = isStorage ? JSON.parse(isStorage) : [];
  const [searchHistory, setSearchHistory] = useState<string[]>(initialState);
  const setHistory = useCallback(
    (values: string[]) => {
      setSearchHistory(() => {
        const updated = Array.from(new Set([...values]));
        if (updated.length > 10) updated.pop();
        localStorage.setItem('searchHistory', JSON.stringify(updated));
        return updated;
      });
    },
    [setSearchHistory]
  );

  const setReset = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, [setSearchHistory]);

  return [searchHistory, setHistory, setReset] as const;
};

export default useSearchHistory;
