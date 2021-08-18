import { getMyWishGoods } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/components/Paginator/Paginator';
import Topic from '@src/components/Topic/Topic';
import { GoodsPaginationResult } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DEFAULT_START_PAGE = 1;

const MyWishListView = () => {
  const [goodsPaginationResult, setGoodsPaginationResult] = useState<GoodsPaginationResult>();
  const [page, setPage] = useState(DEFAULT_START_PAGE);

  const fetchWishGoodsList = async () => {
    await getMyWishGoods({ page: 0 });
  };

  useEffect(() => {}, []);

  return (
    <MyWishListViewContainer>
      <Topic>관심 상품 리스트</Topic>
      {/* <GoodsSection goodsList={goodsListMap.goodsList} itemBoxSize='middle' /> */}
      {/* <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} /> */}
    </MyWishListViewContainer>
  );
};

const MyWishListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MyWishListView;
