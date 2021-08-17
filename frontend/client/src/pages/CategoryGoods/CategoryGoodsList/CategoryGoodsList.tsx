import { getGoodsByCategory, GetGoodsByCategoryProps } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/pages/CategoryGoods/CategoryGoodsList/Paginator';
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
  low: 'low',
  high: 'high',
  latest: 'latest',
};

const CategoryGoodsList: React.FC<Props> = ({ category }) => {
  const [goodsListMap, setGoodsListMap] = useState<GoodsListMap | null>(null);
  const [searchQuery, setSearchQuery] = useState<GetGoodsByCategoryProps>({
    categoryName: category,
    page: 1,
    flag: GoodsFlag.latest,
  });

  const fetchGoodsList = async () => {
    const data = await getGoodsByCategory(searchQuery);
    setGoodsListMap(data.result);
  };

  // TODO: 플래그 변경시 page는 1? 아니면 유지?
  const onChangeFlag = (flag: string) => {
    setSearchQuery({
      ...searchQuery,
      page: 1,
      flag,
    });
  };

  useEffect(() => {
    fetchGoodsList();
  }, [searchQuery]);

  return (
    // TODO: Empty UI 필요
    goodsListMap && (
      <CategoryGoodsListContainer>
        <CategoryGoodsListHeader>
          <CategoryGoodsListCount>총 {goodsListMap.meta.totalCount}개</CategoryGoodsListCount>
          <CategoryFlagContainer>
            <CategoryFlag onClick={() => onChangeFlag(GoodsFlag.best)}>인기순</CategoryFlag>
            <CategoryFlag onClick={() => onChangeFlag(GoodsFlag.latest)}>신규순</CategoryFlag>
            <CategoryFlag onClick={() => onChangeFlag(GoodsFlag.low)}>낮은 가격순</CategoryFlag>
            <CategoryFlag onClick={() => onChangeFlag(GoodsFlag.high)}>높은 가격순</CategoryFlag>
          </CategoryFlagContainer>
        </CategoryGoodsListHeader>
        <GoodsSection goodsList={goodsListMap.goodsList} itemBoxSize='middle' />
        <Paginator totalPage={10} currentPage={2} />
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

const CategoryFlag = styled.button`
  opacity: 0.8;
  transition: opacity 0.15s linear;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Do Hyeon', sans-serif;
  :hover {
    opacity: 1;
  }
`;

export default CategoryGoodsList;
