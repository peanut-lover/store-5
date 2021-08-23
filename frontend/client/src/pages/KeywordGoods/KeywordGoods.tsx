import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from '@src/lib/CustomRouter';
import { getGoodsByKeyword } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/components/Paginator/Paginator';
import { GoodsPaginationResult } from '@src/types/Goods';
import Loading from '@src/components/Loading/Loading';
import emptyImgUrl from '@src/assets/empty-kim.gif';
const LIMIT_COUNT_ITEMS_IN_PAGE = 8;
const DEFAULT_START_PAGE = 1;

const appendQuotationMarks = (text: string) => `"${text}"`;

// 상태: 1 로드 중, 2 로드 이후 상품이 있는지 없는지

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

  return goodsPaginationResult ? (
    <CategoryGoodsListContainer>
      <CategoryGoodsListHeader>
        <CategoryGoodsListCount>
          {keyword ? `${appendQuotationMarks(decodeKeyword)} 검색결과` : ''} 총 {goodsPaginationResult.meta.totalCount}
          개
        </CategoryGoodsListCount>
      </CategoryGoodsListHeader>

      {goodsPaginationResult?.meta?.totalCount > 0 ? (
        <>
          <GoodsSection goodsList={goodsPaginationResult.goodsList} itemBoxSize='big' />
          <Paginator
            totalPage={goodsPaginationResult.meta.totalPage}
            currentPage={goodsPaginationResult.meta.page}
            setPage={setCurrentPage}
          />
        </>
      ) : (
        <EmptyImageContainer>
          <img src={emptyImgUrl} />
          <EmptyText>상품이 존재하지 않습니다!</EmptyText>
        </EmptyImageContainer>
      )}
    </CategoryGoodsListContainer>
  ) : (
    <Loading />
  );
};

const CategoryGoodsListContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  animation: pageShowEffect 0.5s 0s;

  @keyframes pageShowEffect {
    from {
      opacity: 0;
      transform: translate(-100%, 0%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
`;

const CategoryGoodsListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 2rem;
`;

const EmptyImageContainer = styled.div`
  width: 100%;
  margin: 10vh 0;
  text-align: center;
`;

const EmptyText = styled.p`
  font-size: 24px;
  margin-top: 24px;
`;

const CategoryGoodsListCount = styled.div`
  width: 20%;
`;

export default KeywordGoods;
