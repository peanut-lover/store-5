import React, { useEffect, useState, useCallback } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import { GetGoodsByOptionProps, GoodsItem, GoodsPaginationResult } from '@src/types/Goods';
import GoodsTableHead from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableHead/GoodsTableHead';
import GoodsTableBody from '@src/pages/GoodsAdmin/GoodsTable/GoodsTableBody/GoodsTableBody';
import Paginator from '@src/components/Paginator/Paginator';
import Search from '@src/pages/GoodsAdmin/GoodsTable/Search/Search';
import GoodsUpdateModal from '@src/portal/GoodsUploadModal/GoodsUploadModal';
import { getGoodsByOption } from '@src/apis/goodsAPI';
import Loading from '@src/components/Loading/Loading';
import emptyImgUrl from '@src/assets/empty-img.png';

interface Props {
  openUploadModal: boolean;
}

const LIMIT_COUNT_ITEMS_IN_PAGE = 10;
const DEFAULT_START_PAGE = 1;

const GoodsTable: React.FC<Props> = ({ openUploadModal }) => {
  const [goodsListMap, setGoodsListMap] = useState<GoodsPaginationResult | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateGoods, setUpdateGoods] = useState<GoodsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<GetGoodsByOptionProps>({
    page: DEFAULT_START_PAGE,
    limit: LIMIT_COUNT_ITEMS_IN_PAGE,
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

  const setKeyword = (keyword: string) => {
    setSearchQuery((searchQuery) => ({
      ...searchQuery,
      keyword,
    }));
  };

  const handleOrderAndSortGoods = (flag: string, sort: 'ASC' | 'DESC') => {
    setSearchQuery({
      ...searchQuery,
      flag,
      sort,
    });
  };

  const handleUpdateGoods = useCallback((goods: GoodsItem) => {
    setUpdateGoods(goods);
  }, []);

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery, updateGoods]);

  useEffect(() => {
    if (!openUploadModal) fetchGoodsList();
  }, [openUploadModal]);

  useEffect(() => {
    if (updateGoods) setOpenUpdateModal(true);
  }, [updateGoods]);

  useEffect(() => {
    if (!openUpdateModal) setUpdateGoods(null);
  }, [openUpdateModal]);

  if (!goodsListMap) {
    return <Loading />;
  }
  return (
    <>
      <Search setKeyword={setKeyword} />
      <GoodsTableContainer>
        {goodsListMap.goodsList.length === 0 ? (
          <EmptyImage src={emptyImgUrl} />
        ) : (
          <>
            <GoodsTableHead handleOrderAndSortGoods={handleOrderAndSortGoods} searchQuery={searchQuery} />
            <GoodsTableBody goodsList={goodsListMap.goodsList} handleUpdateGoods={handleUpdateGoods} />
          </>
        )}
      </GoodsTableContainer>
      <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
      {openUpdateModal && <GoodsUpdateModal onClose={() => setOpenUpdateModal(false)} goods={updateGoods} />}
    </>
  );
};

const GoodsTableContainer = styled('table')`
  width: 100%;
  text-align: center;
`;

const EmptyImage = styled('img')`
  width: 200px;
  margin-top: 10vh;
`;

export default GoodsTable;
