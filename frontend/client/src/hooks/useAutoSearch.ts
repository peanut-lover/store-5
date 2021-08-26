import { SearchAPI } from './../apis/searchAPI';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoSearchedItem } from '@src/types/Search';

interface AutoSearchHook {
  (): [AutoSearchedItem[], (keyword: string) => Promise<void>, Dispatch<SetStateAction<AutoSearchedItem[]>>];
}

const useAutoSearch: AutoSearchHook = () => {
  const [autoSearchList, setAutoSearchList] = useState<AutoSearchedItem[]>([]);
  async function fetchAutoSearchList(keyword: string) {
    if (keyword.length === 0) return setAutoSearchList([]);
    try {
      const { result } = await SearchAPI.getAutoSearchList(keyword);
      setAutoSearchList(result);
    } catch (err) {
      console.error(err);
    }
  }
  return [autoSearchList, fetchAutoSearchList, setAutoSearchList];
};

export default useAutoSearch;
