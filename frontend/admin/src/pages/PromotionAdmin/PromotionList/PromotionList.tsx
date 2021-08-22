import { styled } from '@src/lib/CustomStyledComponent';
import PromotionItem from '@src/pages/PromotionAdmin/PromotionList/PromotionItem/PromotionItem';
import { Promotion } from '@src/types/Promotion';
import React from 'react';

interface Props {
  promotions: Promotion[];
  onDeletePromotion: (promotionId: number) => Promise<void>;
  onOpenModal: () => void;
}

const PromotionList: React.FC<Props> = ({ promotions, onDeletePromotion, onOpenModal }) => {
  return (
    <PromotionListContainer>
      <PromotionAddButtonContainer>
        <PromotionAddButton onClick={onOpenModal}>+</PromotionAddButton>
      </PromotionAddButtonContainer>
      {promotions.map((promotion) => (
        <PromotionItem key={promotion.id} onDeletePromotion={onDeletePromotion} promotion={promotion} />
      ))}
    </PromotionListContainer>
  );
};

const PromotionListContainer = styled('ul')`
  position: relative;
  display: flex;
  width: 90%;
  min-width: 972px;
  height: 80%;
  margin: auto;
  flex-wrap: wrap;
  overflow: auto;
  padding: 40px 40px 0 40px;
  border: 1px solid lightgray;
  border-radius: 16px;
`;
const PromotionAddButtonContainer = styled('div')`
  position: relative;
  padding: 25px;
  width: 50%;
  height: 400px;
  min-width: 440px;
  min-height: 320px;
`;
const PromotionAddButton = styled('button')`
  position: relative;
  font-size: 2em;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  color: gray;
`;

export default PromotionList;
