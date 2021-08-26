import { getMyWishGoods } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import Paginator from '@src/components/Paginator/Paginator';
import Topic from '@src/components/Topic/Topic';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import { GoodsPaginationResult } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import emptyCartImgUrl from '@src/assets/empty-cart.png';

const DEFAULT_START_PAGE = 1;
const LIMIT_COUNT_ITEMS_IN_PAGE = 4;

const MyWishListView = () => {
  const [goodsPaginationResult, setGoodsPaginationResult] = useState<GoodsPaginationResult>();
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);
  const pushToast = usePushToast();

  const fetchWishGoodsList = async () => {
    try {
      const { result } = await getMyWishGoods({ page: currentPage, limit: LIMIT_COUNT_ITEMS_IN_PAGE });
      setGoodsPaginationResult(result);
    } catch (err) {
      console.error(err);
      pushToast({ text: '찜 리스트를 불러오는데 실패했습니다. 서버오류' });
    }
  };

  useEffect(() => {
    fetchWishGoodsList();
  }, [currentPage]);

  if (!goodsPaginationResult) return null;

  return (
    <MyWishListViewContainer>
      <Topic>관심 상품 리스트</Topic>
      {goodsPaginationResult.goodsList.length > 0 ? (
        <div>
          <GoodsSection goodsList={goodsPaginationResult.goodsList} itemBoxSize='small' />
          <Paginator
            totalPage={goodsPaginationResult.meta.totalPage}
            currentPage={goodsPaginationResult.meta.page}
            setPage={setCurrentPage}
          />
        </div>
      ) : (
        <EmptyContainer>
          <EmptyImg src={emptyCartImgUrl} />
          <EmptyTitle>관심 상품이 없습니다.</EmptyTitle>
        </EmptyContainer>
      )}
    </MyWishListViewContainer>
  );
};

const MyWishListViewContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  animation: fadeInEffect 0.5s 0s;
  @keyframes fadeInEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const EmptyImg = styled.img`
  height: 8rem;
`;

const EmptyTitle = styled.h2`
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 1.25rem;
  font-weight: normal;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 8rem;
`;

export default MyWishListView;
