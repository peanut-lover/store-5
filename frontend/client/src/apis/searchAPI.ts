import { APIResponse, checkedFetch } from '@src/apis/base';
import { AutoSearchedItem } from '@src/types/Search';

async function getAutoSearchList(keyword: string): Promise<APIResponse<AutoSearchedItem[]>> {
  const res = await checkedFetch(`/api/search?keyword=${keyword}`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}

export const SearchAPI = {
  getAutoSearchList,
};
