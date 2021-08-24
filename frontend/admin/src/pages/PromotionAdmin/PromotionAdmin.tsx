import PromotionAPI from '@src/apis/promotionAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import PromotionList from '@src/pages/PromotionAdmin/PromotionList/PromotionList';
import PromotionUploadModal from '@src/portal/PromotionUploadModal/PromotionUploadModal';
import { theme } from '@src/theme/theme';
import { Promotion } from '@src/types/Promotion';
import React, { useCallback, useEffect, useState } from 'react';

const PromotionAdmin = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [openPromotionModal, setOpenPromotionModal] = useState<boolean>(false);

  const fetchingPromotions = useCallback(async () => {
    try {
      const { result } = await PromotionAPI.getPromotions();
      setPromotions(result);
    } catch (err) {
      console.error(err);
    }
  }, [setPromotions]);

  const handleOpenModal = useCallback(() => {
    setOpenPromotionModal(true);
  }, [setOpenPromotionModal]);

  const handleCloseModal = useCallback(() => {
    setOpenPromotionModal(false);
  }, [setOpenPromotionModal]);

  const handleDeletePromotion = useCallback(async (promotionId: number) => {
    await PromotionAPI.deletePromotion(promotionId);
    setPromotions((prev) => prev.filter((promotion) => promotionId !== promotion.id));
  }, []);

  useEffect(() => {
    fetchingPromotions();
  }, []);
  return (
    <PromotionAdminContainer>
      <PromotionCounterContainer>
        <PromotionSpan color={theme.greenColor}>{`등록된 프로모션 ${promotions.length}건`}</PromotionSpan>
      </PromotionCounterContainer>
      <PromotionList promotions={promotions} onDeletePromotion={handleDeletePromotion} onOpenModal={handleOpenModal} />
      {openPromotionModal && <PromotionUploadModal updatePromotions={fetchingPromotions} onClose={handleCloseModal} />}
    </PromotionAdminContainer>
  );
};

const PromotionAdminContainer = styled('div')`
  position: relative;
  width: 100%;
  min-width: 1280px;
`;

const PromotionCounterContainer = styled('div')`
  margin-left: 5%;
  margin-top: 3%;
  margin-bottom: 2%;
`;
const PromotionSpan = styled('span')<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 1.2em;
  margin-right: 12px;
`;

export default PromotionAdmin;
