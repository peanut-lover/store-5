import React, { useEffect, useReducer, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GetGoodsByOptionProps, GoodsItem, GoodsPaginationResult } from '@src/types/Goods';
import GoodsTableHead from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableHead/GoodsTableHead';
import GoodsTableBody from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableBody';
import Paginator from '@src/components/Paginator/Paginator';
import Search from '@src/pages/GoodsAdmin/GoodsTable/Search/Search';
import GoodsUpdateModal from '@src/portal/GoodsUploadModal/GoodsUploadModal';
import { getGoodsByOption } from '@src/apis/goodsAPI';
import { useCallback } from 'react';
import Loading from '@src/components/Loading/Loading';

const LIMIT_COUNT_ITEMS_IN_PAGE = 10;
const DEFAULT_START_PAGE = 1;

const GoodsTable = () => {
  // TODO: reducer 적용
  // const tmp = useReducer(reduce, state);
  const [goodsListMap, setGoodsListMap] = useState<GoodsPaginationResult | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateGoods, setUpdateGoods] = useState<GoodsItem | null>(null);
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

  const handleUpdateGoods = useCallback((goods: GoodsItem) => {
    setUpdateGoods(goods);
  }, []);

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery, updateGoods]);

  useEffect(() => {
    if (updateGoods) setOpenUpdateModal(true);
  }, [updateGoods]);

  useEffect(() => {
    if (!openUpdateModal) setUpdateGoods(null);
  }, [openUpdateModal]);

  // TODO: 로딩 UI 적용
  return goodsListMap ? (
    <>
      <Search />
      <GoodsTableContainer>
        <GoodsTableHead />
        <GoodsTableBody goodsList={goodsListMap.goodsList} handleUpdateGoods={handleUpdateGoods} />
      </GoodsTableContainer>
      <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
      {openUpdateModal && <GoodsUpdateModal onClose={() => setOpenUpdateModal(false)} goods={updateGoods} />}
    </>
  ) : (
    <Loading />
  );
};

const GoodsTableContainer = styled('table')`
  width: 100%;
  text-align: center;
`;

export default GoodsTable;
