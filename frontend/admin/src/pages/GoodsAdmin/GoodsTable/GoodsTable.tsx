import React, { useEffect, useReducer, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GetGoodsByOptionProps, GoodsItem, GoodsPaginationResult } from '@src/types/Goods';
import GoodsTableHead from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableHead/GoodsTableHead';
import GoodsTableBody from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableBody';
import Paginator from '@src/components/Paginator/Paginator';
import Search from '@src/pages/GoodsAdmin/GoodsTable/Search/Search';
import GoodsModifyModal from '@src/portal/GoodsUploadModal/GoodsUploadModal';
import { getGoodsByOption } from '@src/apis/goodsAPI';
import { useCallback } from 'react';

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
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [modifyGoods, setModifyGoods] = useState<GoodsItem | null>(null);
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

  const handleModifyGoods = useCallback((goods: GoodsItem) => {
    setModifyGoods(goods);
  }, []);

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery]);

  useEffect(() => {
    if (modifyGoods) setOpenModifyModal(true);
  }, [modifyGoods]);

  // TODO: 로딩 UI 적용
  return (
    goodsListMap && (
      <>
        <Search />
        <GoodsTableContainer>
          <GoodsTableHead />
          <GoodsTableBody goodsList={goodsListMap.goodsList} handleModifyGoods={handleModifyGoods} />
        </GoodsTableContainer>
        <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
        {openModifyModal && <GoodsModifyModal onClose={() => setOpenModifyModal(false)} goods={modifyGoods} />}
      </>
    )
  );
};

const GoodsTableContainer = styled('table')`
  width: 100%;
  text-align: center;
`;

export default GoodsTable;
