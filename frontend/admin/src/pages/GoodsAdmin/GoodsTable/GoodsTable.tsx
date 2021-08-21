import React, { useEffect, useReducer, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GetGoodsByOptionProps, GoodsItem, GoodsPaginationResult } from '@src/types/Goods';
import GoodsTableHead from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableHead/GoodsTableHead';
import GoodsTableBody from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableBody';
import Paginator from '@src/components/Paginator/Paginator';
import Search from '@src/pages/GoodsAdmin/GoodsTable/Search/Search';
import { getGoodsByOption } from '@src/apis/goodsAPI';

const LIMIT_COUNT_ITEMS_IN_PAGE = 10;
const DEFAULT_START_PAGE = 1;

/*
  goodsList: GoodsItem[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
*/

const GoodsTable = () => {
  // TODO: reducer 적용
  // const tmp = useReducer(reduce, state);
  const [goodsListMap, setGoodsListMap] = useState<GoodsPaginationResult | null>(null);
  const [searchQuery, setSearchQuery] = useState<GetGoodsByOptionProps>({
    page: DEFAULT_START_PAGE,
    limit: LIMIT_COUNT_ITEMS_IN_PAGE,
    keyword: '',
  });

  const fetchGoodsList = async () => {
    try {
      const data = await getGoodsByOption({ ...searchQuery, limit: LIMIT_COUNT_ITEMS_IN_PAGE });
      setGoodsListMap(data.result);
    } catch (e) {
      setGoodsListMap(null);
    }
  };

  const setPage = (page: number) => {
    setSearchQuery({
      ...searchQuery,
      page,
    });
  };

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery]);

  // TODO: 로딩 UI 적용
  return (
    goodsListMap && (
      <>
        <Search />
        <GoodsTableContainer>
          <GoodsTableHead />
          <GoodsTableBody goodsList={goodsListMap.goodsList} />
        </GoodsTableContainer>
        <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
      </>
    )
  );
};

const GoodsTableContainer = styled('table')`
  width: 100%;
  text-align: center;
`;

export default GoodsTable;

const goodsList: GoodsItem[] = [
  {
    id: 20,
    thumbnailUrl:
      'https://user-images.githubusercontent.com/45394360/129675529-f90e2e73-222b-4815-9495-98e4b1647cb9.png',
    title: '상품명 랜덤 - 793',
    price: 91226,
    stock: 11,
    discountRate: 44,
    countOfSell: 47,
    state: 'S',
    isGreen: false,
    category: {
      name: '이름',
      id: 1,
    },
    createdAt: '2021-08-17T08:34:00.090Z',
    updatedAt: '2021-08-17T08:34:00.090Z',
    deliveryInfo: 1,
  },
];
