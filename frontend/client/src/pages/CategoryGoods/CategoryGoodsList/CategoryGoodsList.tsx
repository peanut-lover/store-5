import { getGoodsByCategory, GetGoodsByCategoryProps } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import CategoryFlag from '@src/pages/CategoryGoods/CategoryGoodsList/CategoryFlag';
import Paginator from '@src/pages/CategoryGoods/CategoryGoodsList/Paginator';
import theme from '@src/theme/theme';
import { ThumbnailGoods } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  category: string;
}

interface GoodsListMap {
  goodsList: ThumbnailGoods[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}

const GoodsFlag = {
  best: 'best',
  latest: 'latest',
  low: 'low',
  high: 'high',
};

const flags = [
  { label: GoodsFlag.best, text: '인기순' },
  { label: GoodsFlag.latest, text: '신규순' },
  { label: GoodsFlag.low, text: '낮은 가격순' },
  { label: GoodsFlag.high, text: '높은 가격순' },
];

const DEFAULT_START_PAGE = 1;

const CategoryGoodsList: React.FC<Props> = ({ category }) => {
  const [goodsListMap, setGoodsListMap] = useState<GoodsListMap | null>(null);
  const [searchQuery, setSearchQuery] = useState<GetGoodsByCategoryProps>({
    categoryName: category,
    page: DEFAULT_START_PAGE,
    flag: GoodsFlag.latest,
  });

  const fetchGoodsList = async () => {
    try {
      const data = await getGoodsByCategory(searchQuery);
      setGoodsListMap(data.result);
    } catch (e) {
      setGoodsListMap(null);
    }
  };

  // TODO: 플래그 변경시 page는 1? 아니면 유지?
  const setSearchFlag = (flag: string) => {
    setSearchQuery({
      ...searchQuery,
      page: 1,
      flag,
    });
  };

  const setCategory = (category: string) => {
    setSearchQuery({
      ...searchQuery,
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
  }, [searchQuery]);

  useEffect(() => {
    setCategory(category);
  }, [category]);

  return (
    // TODO: Empty UI 필요
    goodsListMap && (
      <CategoryGoodsListContainer>
        <CategoryGoodsListHeader>
          <CategoryGoodsListCount>총 {goodsListMap.meta.totalCount}개</CategoryGoodsListCount>
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
        <GoodsSection goodsList={goodsListMap.goodsList} itemBoxSize='middle' />
        <Paginator totalPage={goodsListMap.meta.totalPage} currentPage={goodsListMap.meta.page} setPage={setPage} />
      </CategoryGoodsListContainer>
    )
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
