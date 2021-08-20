import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoSearch } from '@src/types/Search';
import SearchAPI from '@src/apis/searchAPI';

interface AutoSearchHook {
  (): [AutoSearch[], (keyword: string) => Promise<void>, Dispatch<SetStateAction<AutoSearch[]>>];
}

const useAutoSearch: AutoSearchHook = () => {
  const [autoSearchList, setAutoSearchList] = useState<AutoSearch[]>([]);
  async function fetchAutoSearchList(keyword: string) {
    if (keyword.length === 0) return setAutoSearchList([]);
    const { result } = await SearchAPI.getAutoSearchList(keyword);
    if (result) return setAutoSearchList(result);
  }
  return [autoSearchList, fetchAutoSearchList, setAutoSearchList];
};

export default useAutoSearch;
