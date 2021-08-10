import React, { useCallback, useEffect, useState } from 'react';

const useSearchHistory = () => {
  const isStorage = localStorage.getItem('searchHistory');
  const initialState = isStorage ? JSON.parse(isStorage) : [];
  const [searchHistory, setSearchHistory] = useState<string[]>(initialState);
  const setHistory = useCallback((value: string) => {
    setSearchHistory((prev: string[]) => {
      const updated = Array.from(new Set([value, ...prev]));
      if (updated.length > 10) updated.pop();
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return [searchHistory, setHistory] as const;
};

export default useSearchHistory;
