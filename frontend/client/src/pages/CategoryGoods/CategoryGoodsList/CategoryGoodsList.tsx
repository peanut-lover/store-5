import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryFlag from '@src/pages/CategoryGoods/CategoryGoodsList/CategoryFlag';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/components/Paginator/Paginator';
import useScrollToTop from '@src/hooks/useScrollToTop';
import useUserState from '@src/hooks/useUserState';
import Loading from '@src/components/AddressModals/Loading/Loading';

import { GoodsPaginationResult } from '@src/types/Goods';
import { getGoodsByCategory, GetGoodsByCategoryProps } from '@src/apis/goodsAPI';

import emptyImgUrl from '@src/assets/empty-kim.gif';

interface Props {
  category: string;
}

const GoodsFlag = {
  best: 'sell',
  latest: 'create',
  low: 'low_price',
  high: 'high_price',
};

const flags = [
  { label: GoodsFlag.best, text: '인기순' },
  { label: GoodsFlag.latest, text: '신규순' },
  { label: GoodsFlag.low, text: '낮은 가격순' },
  { label: GoodsFlag.high, text: '높은 가격순' },
];

const INVALID_CATEGORY = '존재하지 않는 카테고리 입니다!';
const EMPTY_LIST = '상품이 존재하지 않습니다!';

const LIMIT_COUNT_ITEMS_IN_PAGE = 8;
const DEFAULT_START_PAGE = 1;

const getOrderByOption = (flag: string) => (flag === 'low_price' ? 'ASC' : 'DESC');

const convertAPIFlag = (flag: string) => (flag === 'low_price' || flag === 'high_price' ? 'price' : flag);

const CategoryGoodsList: React.FC<Props> = ({ category }) => {
  const [user] = useUserState();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [goodsPaginationResult, setgoodsPaginationResult] = useState<GoodsPaginationResult | null>(null);
  const [searchQuery, setSearchQuery] = useScrollToTop<GetGoodsByCategoryProps>({
    categoryName: category,
    page: DEFAULT_START_PAGE,
    flag: GoodsFlag.latest,
  });

  const fetchGoodsList = async () => {
    setIsLoading(true);
    try {
      const data = await getGoodsByCategory({
        ...searchQuery,
        limit: LIMIT_COUNT_ITEMS_IN_PAGE,
        sort: getOrderByOption(searchQuery.flag),
        flag: convertAPIFlag(searchQuery.flag),
      });
      setgoodsPaginationResult(data.result);
    } catch (e) {
      setgoodsPaginationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setSearchFlag = (flag: string) => {
    setSearchQuery({
      ...searchQuery,
      page: DEFAULT_START_PAGE,
      flag,
    });
  };

  const setCategory = (category: string) => {
    setSearchQuery({
      ...searchQuery,
      page: DEFAULT_START_PAGE,
      categoryName: category,
    });
  };

  const setPage = (page: number) => {
    setSearchQuery({
      ...searchQuery,
      page,
    });
  };

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery, user]);

  useEffect(() => {
    setCategory(category);
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }
  if (!goodsPaginationResult) {
    return (
      <EmptyImageContainer>
        <img src={emptyImgUrl} />
        <EmptyText>{INVALID_CATEGORY}</EmptyText>
      </EmptyImageContainer>
    );
  }

  return (
    <CategoryGoodsListContainer>
      <CategoryGoodsListHeader>
        <CategoryGoodsListCount>총 {goodsPaginationResult.meta.totalCount}개</CategoryGoodsListCount>
        <CategoryFlagContainer>
          {flags.map((flag) => (
            <CategoryFlag
              key={flag.label}
              flagLabel={flag.label}
              flagText={flag.text}
              active={flag.label === searchQuery.flag}
              setSearchFlag={setSearchFlag}
            />
          ))}
        </CategoryFlagContainer>
      </CategoryGoodsListHeader>
      {goodsPaginationResult?.meta?.totalCount > 0 ? (
        <>
          <GoodsSection goodsList={goodsPaginationResult.goodsList} itemBoxSize='big' />
          <Paginator
            totalPage={goodsPaginationResult.meta.totalPage}
            currentPage={goodsPaginationResult.meta.page}
            setPage={setPage}
          />
        </>
      ) : (
        <EmptyImageContainer>
          <img src={emptyImgUrl} />
          <EmptyText>{EMPTY_LIST}</EmptyText>
        </EmptyImageContainer>
      )}
    </CategoryGoodsListContainer>
  );
};

const CategoryGoodsListContainer = styled.div`
  width: 100%;
`;

const CategoryGoodsListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
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

const CategoryFlagContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  column-gap: 1.25rem;
`;

export default CategoryGoodsList;
