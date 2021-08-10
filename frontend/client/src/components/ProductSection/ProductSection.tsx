import React from 'react';
import ProductItemList from 'src/components/ProductItemList/ProductItemList';
import { Product } from 'src/types/Product';
import styled from 'styled-components';

interface Props {
  sectionTitle: string;
  products: Product[];
}

const ProductSection: React.FC<Props> = ({ sectionTitle, products }) => {
  return (
    <ProductSectionContainer>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <ProductItemList products={products} />
    </ProductSectionContainer>
  );
};

const ProductSectionContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
`;
const SectionTitle = styled.h2``;

export default ProductSection;
