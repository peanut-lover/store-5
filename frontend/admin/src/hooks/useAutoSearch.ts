import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoSearchedItem } from '@src/types/Search';
import SearchAPI from '@src/apis/searchAPI';

interface AutoSearchHook {
  (): [AutoSearchedItem[], (keyword: string) => Promise<void>, Dispatch<SetStateAction<AutoSearchedItem[]>>];
}

const useAutoSearch: AutoSearchHook = () => {
  const [autoSearchList, setAutoSearchList] = useState<AutoSearchedItem[]>([]);
  async function fetchAutoSearchList(keyword: string) {
    if (keyword.length === 0) return setAutoSearchList([]);
    const { result } = await SearchAPI.getAutoSearchList(keyword);
    if (result) return setAutoSearchList(result);
  }
  return [autoSearchList, fetchAutoSearchList, setAutoSearchList];
};

export default useAutoSearch;
