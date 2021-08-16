import { getGoodsByCategory } from '@src/apis/goodsAPI';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import { Link } from '@src/lib/CustomRouter';
import Paginator from '@src/pages/CategoryGoods/CategoryGoodsList/Paginator';
import { ThumbnailGoods } from '@src/types/Goods';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  category: string;
}

const CategoryGoodsList: React.FC<Props> = ({ category }) => {
  const [goodsList, setGoodsList] = useState<ThumbnailGoods[]>([]);

  const fetchGoodsList = async (categoryName: string) => {
    const data = await getGoodsByCategory(categoryName);
    setGoodsList(data.result.goods);
  };

  useEffect(() => {
    console.log('url 변경');
    fetchGoodsList(category);
  }, [location.search]);

  return (
    <CategoryGoodsListContainer>
      <CategoryFlagContainer>
        <Link to={`?flag=best&page=1`}>인기순</Link>
        <Link to={`?flag=latest&page=1`}>신규순</Link>
        <Link to={`?flag=low&page=1`}>낮은 가격순</Link>
        <Link to={`?flag=high&page=1`}>높은 가격순</Link>
      </CategoryFlagContainer>
      <GoodsSection goodsList={goodsList} itemBoxSize='middle' />
      <Paginator totalPage={10} currentPage={2} locationSearch={location.search} />
    </CategoryGoodsListContainer>
  );
};

const CategoryGoodsListContainer = styled.div`
  width: 100%;
`;

const CategoryFlagContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export default CategoryGoodsList;
