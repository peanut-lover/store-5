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
    <>
      <PromotionListContainer>
        <PromotionAddButtonContainer>
          <PromotionAddButton onClick={onOpenModal}>+</PromotionAddButton>
        </PromotionAddButtonContainer>
        {promotions.map((promotion) => (
          <PromotionItem key={promotion.id} onDeletePromotion={onDeletePromotion} promotion={promotion} />
        ))}
      </PromotionListContainer>
    </>
  );
};

const PromotionListContainer = styled('ul')`
  position: relative;
  display: flex;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;
  overflow: auto;
  padding: 16px;
`;

const PromotionAddButtonContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 280px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const PromotionAddButton = styled('button')`
  position: relative;
  font-size: 3rem;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  color: gray;
`;

export default PromotionList;
