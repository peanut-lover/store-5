import { getMyWishGoods } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import HighlightedText from '@src/components/HighlightedText/HighlightedText';
import Paginator from '@src/components/Paginator/Paginator';
import Topic from '@src/components/Topic/Topic';
import { GoodsPaginationResult } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DEFAULT_START_PAGE = 1;
const LIMIT_COUNT_ITEMS_IN_PAGE = 4;

const MyWishListView = () => {
  const [goodsPaginationResult, setGoodsPaginationResult] = useState<GoodsPaginationResult>();
  const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);

  const fetchWishGoodsList = async () => {
    const { result } = await getMyWishGoods({ page: currentPage, limit: LIMIT_COUNT_ITEMS_IN_PAGE });
    setGoodsPaginationResult(result);
  };

  useEffect(() => {
    try {
      fetchWishGoodsList();
    } catch (err) {
      console.error(err);
      alert('찜 리스트를 불러오는데 실패했습니다. 서버오류');
    }
  }, [currentPage]);

  return (
    <MyWishListViewContainer>
      <Topic>관심 상품 리스트</Topic>
      {goodsPaginationResult ? (
        <>
          <GoodsSection goodsList={goodsPaginationResult.goodsList} itemBoxSize='small' />
          <Paginator
            totalPage={goodsPaginationResult.meta.totalPage}
            currentPage={goodsPaginationResult.meta.page}
            setPage={setCurrentPage}
          />
        </>
      ) : (
        <>
          <HighlightedText> 찜 리스트가 비어있습니다! </HighlightedText>
        </>
      )}
    </MyWishListViewContainer>
  );
};

const MyWishListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyWishListView;
