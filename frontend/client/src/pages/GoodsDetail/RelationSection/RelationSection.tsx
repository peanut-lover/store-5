import React, { useState, useEffect } from 'react';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import { ThumbnailGoods } from '@src/types/Goods';
import { getRelationGoods } from '@src/apis/goodsAPI';

interface Props {
  goodsId: number;
  categoryName: string;
}

const RelationSectionTitle = '연관 상품';

const RelationSection: React.FC<Props> = ({ goodsId, categoryName }) => {
  const [relationGoodsList, setRelationGoodsList] = useState<ThumbnailGoods[]>([]);

  const fetchDetailGoods = async (categoryName: string) => {
    try {
      const { result } = await getRelationGoods(goodsId, categoryName);
      setRelationGoodsList(result.goodsList);
    } catch (e) {
      setRelationGoodsList([]);
    }
  };

  useEffect(() => {
    fetchDetailGoods(categoryName);
  }, []);

  return relationGoodsList && <GoodsSection sectionTitle={RelationSectionTitle} goodsList={relationGoodsList} />;
};

export default RelationSection;
