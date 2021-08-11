import React from 'react';
import GoodsItemList from 'src/components/GoodsItemList/GoodsItemList';
import { Goods } from 'src/types/Goods';
import styled from 'styled-components';

interface Props {
  sectionTitle: string;
  goodsList: Goods[];
}

const GoodsSection: React.FC<Props> = ({ sectionTitle, goodsList }) => {
  return (
    <GoodsSectionContainer>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <GoodsItemList goodsList={goodsList} />
    </GoodsSectionContainer>
  );
};

const GoodsSectionContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
`;

const SectionTitle = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export default GoodsSection;
