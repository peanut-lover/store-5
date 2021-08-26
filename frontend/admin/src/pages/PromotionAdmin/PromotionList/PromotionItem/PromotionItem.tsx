import React, { useCallback, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import ConfirmModal from '@src/portal/ConfirmModal/ConfirmModal';
import { theme } from '@src/theme/theme';
import { Promotion } from '@src/types/Promotion';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

const PROMOTION_DELETE_MESSAGE = '해당 프로모션을 삭제하시겠습니까?';

interface Props {
  promotion: Promotion;
  onDeletePromotion: (promotionId: number) => Promise<void>;
}

const PromotionItem: React.FC<Props> = ({ promotion, onDeletePromotion }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, [setOpenDeleteModal]);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, [setOpenDeleteModal]);

  const handleDeletePromotion = useCallback(async () => {
    try {
      onDeletePromotion(promotion.id);
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <PromotionContainer>
      <PromotionContent color={theme.black3}>
        <p>조회수 {promotion.view}</p>
      </PromotionContent>
      <PromotionImage src={promotion.imgUrl} />
      <PromotionDeleteButton onClick={handleOpenDeleteModal} bgcolor={theme.greenColor}>
        <FaTimes />
      </PromotionDeleteButton>
      {openDeleteModal && (
        <ConfirmModal
          title={PROMOTION_DELETE_MESSAGE}
          onConfirm={handleDeletePromotion}
          onClose={handleCloseDeleteModal}
        />
      )}
    </PromotionContainer>
  );
};

const PromotionContainer = styled('div')`
  position: relative;
  width: 50%;
  padding: 1rem;
`;

const PromotionContent = styled('div')<{ color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-bottom: 0.5rem;
`;

const PromotionImage = styled('img')`
  width: 100%;
  height: 250px;
  border-radius: 10px;
`;

const PromotionDeleteButton = styled('button')<{ bgcolor: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  top: 2rem;
  right: 0;
  font-size: 1.5em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border: none;
  cursor: pointer;
`;

export default PromotionItem;
