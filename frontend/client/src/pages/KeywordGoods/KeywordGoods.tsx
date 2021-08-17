import { useParams } from '@src/lib/CustomRouter';
import { getGoodsByKeyword } from '@src/apis/goodsAPI';
import React, { useEffect, useState } from 'react';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import Paginator from '@src/pages/CategoryGoods/CategoryGoodsList/Paginator';
import theme from '@src/theme/theme';
import { ThumbnailGoods } from '@src/types/Goods';
import styled from 'styled-components';

interface GoodsListMap {
  goodsList: ThumbnailGoods[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    totalCount: number;
  };
}

const appendQuotationMarks = (text: string) => `"${text}"`;

const KeywordGoods: React.FC = () => {
  const { keyword = '' } = useParams();
  const [goodsListMap, setGoodsListMap] = useState<GoodsListMap | null>(null);

  const fetchGoodsList = async () => {
    const data = await getGoodsByKeyword({
      keyword,
      page: 1,
    });
    setGoodsListMap(data.result);
  };

  useEffect(() => {
    fetchGoodsList();
  }, [keyword]);

  const decodeKeyword = decodeURI(keyword);
  return (
    // TODO: Empty UI 필요
    goodsListMap && (
      <CategoryGoodsListContainer>
        <CategoryGoodsListHeader>
          <CategoryGoodsListCount>
            {keyword ? `${appendQuotationMarks(decodeKeyword)} 검색결과` : ''} 총 {goodsListMap.meta.totalCount}개
          </CategoryGoodsListCount>
        </CategoryGoodsListHeader>
        <GoodsSection goodsList={goodsListMap.goodsList} itemBoxSize='middle' />
        <Paginator totalPage={10} currentPage={2} />
      </CategoryGoodsListContainer>
    )
  );
};

const CategoryGoodsListContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const CategoryGoodsListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 2rem;
`;

const CategoryGoodsListCount = styled.div`
  width: 20%;
`;

export default KeywordGoods;
