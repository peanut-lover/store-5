import { APIResponse, checkedFetch } from './base';
import { AutoSearch } from '@src/types/Search';

async function getAutoSearchList(keyword: string): Promise<APIResponse<AutoSearch[] | null>> {
  const res = await checkedFetch(`/api/search?keyword=${keyword}`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}

const SearchAPI = {
  getAutoSearchList,
};
export default SearchAPI;
