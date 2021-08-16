import { GoodsRepository } from '../repository/goods.repository';
import { SearchedGoodsFromKeyword } from '../types/response/search.response';

async function getAutoSearchList(keyword: string): Promise<SearchedGoodsFromKeyword[]> {
  return await GoodsRepository.searchGoodsFromKeyword(keyword);
}

export const SearchService = {
  getAutoSearchList,
};
