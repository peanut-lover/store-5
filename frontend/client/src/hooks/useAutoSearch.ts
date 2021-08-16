import { SearchAPI } from './../apis/searchAPI';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AutoSearch } from '@src/types/Search';

type CustomAutoSearch = [AutoSearch[], (keyword: string) => Promise<void>, Dispatch<SetStateAction<AutoSearch[]>>];

const useAutoSearch = (): CustomAutoSearch => {
  const [autoSearchList, setAutoSearchList] = useState<AutoSearch[]>([]);
  async function fetchAutoSearchList(keyword: string) {
    if (keyword.length === 0) return setAutoSearchList([]);
    const data = await SearchAPI.getAutoSearchList(keyword);
    if (data) return setAutoSearchList(data);
  }
  return [autoSearchList, fetchAutoSearchList, setAutoSearchList];
};

export default useAutoSearch;
