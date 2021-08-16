import { AutoSearch } from '@src/types/Search';

async function getAutoSearchList(keyword: string): Promise<AutoSearch[] | null> {
  try {
    const res = await fetch(`/api/search?keyword=${keyword}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const SearchAPI = {
  getAutoSearchList,
};
