import { styled } from '@src/lib/CustomStyledComponent';
import PromotionItem from '@src/pages/PromotionAdmin/PromotionList/PromotionItem/PromotionItem';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { Promotion } from '@src/types/Promotion';
import React, { useCallback } from 'react';
import { theme } from '@src/theme/theme';

interface Props {
  promotions: Promotion[];
  onDeletePromotion: (promotionId: number) => Promise<void>;
  onOpenModal: () => void;
  limitCount: number;
}

const PLUS_SIZE = 48;
const MAX_ALERT = '프로모션을 더 이상 등록하실 수 없습니다.';

const PromotionList: React.FC<Props> = ({ promotions, onDeletePromotion, onOpenModal, limitCount }) => {
  const onButtonClick = useCallback(() => {
    if (promotions.length !== limitCount) onOpenModal();
  }, [promotions]);
  return (
    <>
      <PromotionListContainer>
        <PromotionAddButtonContainer>
          <PromotionAddButton onClick={onButtonClick} clickable={promotions.length !== limitCount}>
            <FaPlus size={PLUS_SIZE} />
            <span>
              {promotions.length} / {limitCount}
            </span>
            {promotions.length === limitCount && <AlertText color={theme.error}>{MAX_ALERT}</AlertText>}
          </PromotionAddButton>
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
  padding: 16px;
`;

const PromotionAddButtonContainer = styled('div')`
  position: relative;
  width: 50%;
  padding: 1rem;
  margin-top: 22px;
  margin-bottom: 1rem;
`;

const PromotionAddButton = styled('button')<{ clickable: boolean }>`
  position: relative;
  font-size: 1.5rem;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  color: ${(props) => (props.clickable ? 'gray' : '#ddd')};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
`;

const AlertText = styled('span')<{ color: string }>`
  font-size: 14px;
  color: ${(props) => props.color};
  font-weight: 600;
`;

export default PromotionList;
