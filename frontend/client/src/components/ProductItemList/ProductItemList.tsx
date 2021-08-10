import React from 'react';
import ProductItem from 'src/components/ProductItem/ProductItem';
import { Product } from 'src/types/Product';
import styled from 'styled-components';

interface Props {
  products: Product[];
}

const ProductItemList: React.FC<Props> = ({ products }) => {
  return (
    <ProductItemListContainer>
      {products && products.map((product) => <ProductItem key={product.id} {...product} />)}
    </ProductItemListContainer>
  );
};

const ProductItemListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default ProductItemList;
