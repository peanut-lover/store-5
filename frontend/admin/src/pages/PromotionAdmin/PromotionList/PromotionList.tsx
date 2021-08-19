import { styled } from '@src/lib/CustomStyledComponent';
import PromotionItem from '@src/pages/PromotionAdmin/PromotionList/PromotionItem/PromotionItem';
import { Promotion } from '@src/types/Promotion';
import React from 'react';

interface Props {
  promotions: Promotion[];
}

const PromotionList: React.FC<Props> = ({ promotions }) => {
  return (
    <PromotionListContainer>
      {promotions.map((promotion) => (
        <PromotionItem key={promotion.id} promotion={promotion} />
      ))}
    </PromotionListContainer>
  );
};

const PromotionListContainer = styled('ul')`
  position: relative;
  display: flex;
  width: 90%;
  min-width: 972px;
  height: 70%;
  margin: auto;
  margin-top: 10%;
  flex-wrap: wrap;
`;

export default PromotionList;
