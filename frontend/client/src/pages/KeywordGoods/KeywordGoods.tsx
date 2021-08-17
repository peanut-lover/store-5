import { useParams } from '@src/lib/CustomRouter';
import { getGoodsByKeyword } from '@src/apis/goodsAPI';
import React, { useEffect, useState } from 'react';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/pages/CategoryGoods/CategoryGoodsList/Paginator';
import { ThumbnailGoods } from '@src/types/Goods';
import styled from 'styled-components';

interface GoodsListMap {
  goodsList: ThumbnailGoods[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}

const DEFAULT_START_PAGE = 1;

const appendQuotationMarks = (text: string) => `"${text}"`;

const KeywordGoods: React.FC = () => {
  const { keyword = '' } = useParams();
  const [goodsListMap, setGoodsListMap] = useState<GoodsListMap | null>(null);
  const [page, setPage] = useState(DEFAULT_START_PAGE);

  const fetchGoodsList = async () => {
    try {
      const data = await getGoodsByKeyword({
        keyword,
        page,
      });
      setGoodsListMap(data.result);
    } catch (e) {
      setGoodsListMap(null);
    }
  };

  useEffect(() => {
    fetchGoodsList();
  }, [keyword, page]);

  const decodeKeyword = decodeURI(keyword);
  return (
    // TODO: Empty UI 필요
    goodsListMap && (
      <CategoryGoodsListContainer>
        <CategoryGoodsListHeader>
          <CategoryGoodsListCount>
            {keyword ? `${appendQuotationMarks(decodeKeyword)} 검색결과` : ''} 총 {goodsListMap.meta.totalCount}개
          </CategoryGoodsListCount>
        </CategoryGoodsListHeader>
        <GoodsSection goodsList={goodsListMap.goodsList} itemBoxSize='middle' />
        <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
      </CategoryGoodsListContainer>
    )
  );
};

const CategoryGoodsListContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const CategoryGoodsListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 2rem;
`;

const CategoryGoodsListCount = styled.div`
  width: 20%;
`;

export default KeywordGoods;
