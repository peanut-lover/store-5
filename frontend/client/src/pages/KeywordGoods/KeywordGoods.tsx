import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from '@src/lib/CustomRouter';

import { getGoodsByKeyword } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/components/Paginator/Paginator';
import { GoodsPaginationResult } from '@src/types/Goods';
const LIMIT_COUNT_ITEMS_IN_PAGE = 8;
const DEFAULT_START_PAGE = 1;

const appendQuotationMarks = (text: string) => `"${text}"`;

const KeywordGoods: React.FC = () => {
  const { keyword = '' } = useParams();
  const [goodsPaginationResult, setGoodsPaginationResult] = useState<GoodsPaginationResult | null>(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const fetchGoodsList = async () => {
    try {
      const data = await getGoodsByKeyword({
        keyword,
        page: currentPage,
        limit: LIMIT_COUNT_ITEMS_IN_PAGE,
      });
      setGoodsPaginationResult(data.result);
    } catch (e) {
      setGoodsPaginationResult(null);
    }
  };

  useEffect(() => {
    fetchGoodsList();
  }, [keyword, currentPage]);

  const decodeKeyword = decodeURI(keyword);
  if (!goodsPaginationResult) {
    return <h1>데이터를 불러오는데 실패</h1>;
  }

  return (
    // TODO: Empty UI 필요
    goodsPaginationResult && (
      <CategoryGoodsListContainer>
        <CategoryGoodsListHeader>
          <CategoryGoodsListCount>
            {keyword ? `${appendQuotationMarks(decodeKeyword)} 검색결과` : ''} 총{' '}
            {goodsPaginationResult.meta.totalCount}개
          </CategoryGoodsListCount>
        </CategoryGoodsListHeader>
        <GoodsSection goodsList={goodsPaginationResult.goodsList} itemBoxSize='big' />
        <Paginator
          totalPage={goodsPaginationResult.meta.totalPage}
          currentPage={goodsPaginationResult.meta.page}
          setPage={setCurrentPage}
        />
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
