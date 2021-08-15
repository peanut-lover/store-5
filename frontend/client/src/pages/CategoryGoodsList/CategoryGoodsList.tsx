import { useParams } from '@src/lib/CustomRouter';
import React from 'react';

const CategoryGoodsView = () => {
  const { category } = useParams();
  return (
    <div>
      <h1>CategoryGoodsView {category}</h1>
    </div>
  );
};

export default CategoryGoodsView;
