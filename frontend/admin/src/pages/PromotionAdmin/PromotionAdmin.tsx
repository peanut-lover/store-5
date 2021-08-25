import PromotionAPI from '@src/apis/promotionAPI';
import { styled } from '@src/lib/CustomStyledComponent';
import PromotionList from '@src/pages/PromotionAdmin/PromotionList/PromotionList';
import PromotionViewChart from '@src/pages/PromotionAdmin/PromotionViewChart/PromotionViewChart';
import PromotionUploadModal from '@src/portal/PromotionUploadModal/PromotionUploadModal';
import { Promotion } from '@src/types/Promotion';
import React, { useCallback, useEffect, useState } from 'react';

const PromotionAdmin = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const fetchingPromotions = useCallback(async () => {
    try {
      const { result } = await PromotionAPI.getPromotionsForAdmin();
      setPromotions(result);
    } catch (err) {
      console.error(err);
    }
  }, [setPromotions]);

  const [openPromotionModal, setOpenPromotionModal] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setOpenPromotionModal(false);
  }, [setOpenPromotionModal]);

  const onOpenModal = useCallback(() => {
    setOpenPromotionModal(true);
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
      <PromotionAdminHeader>
        <Title>프로모션 관리</Title>
        <PromotionSpan>{`총 프로모션 ${promotions.length}건`}</PromotionSpan>
      </PromotionAdminHeader>
      <PromotionAdminBody>
        <PromotionChartContainer>
          <PromotionViewChart promotions={promotions} />
        </PromotionChartContainer>
        <PromotionList promotions={promotions} onDeletePromotion={handleDeletePromotion} onOpenModal={onOpenModal} />
      </PromotionAdminBody>
      {openPromotionModal && <PromotionUploadModal updatePromotions={fetchingPromotions} onClose={handleCloseModal} />}
    </PromotionAdminContainer>
  );
};

const PromotionAdminContainer = styled('div')`
  width: 100%;
  position: relative;
  margin: 5rem;
  margin-bottom: 0;
  min-width: 1280px;
`;

const PromotionAdminHeader = styled('div')`
  display: flex;
  column-gap: 1rem;
  margin-bottom: 20px;
  align-items: flex-end;
`;

const Title = styled('h2')`
  font-size: 24px;
  font-weight: 600;
`;

const PromotionSpan = styled('span')`
  font-size: 16px;
`;

const PromotionAdminBody = styled('div')`
  display: flex;
  width: 100%;
  position: relative;
`;

const PromotionChartContainer = styled('div')`
  position: relative;
  padding: 16px;
  width: 100%;
  height: 300px;
`;

export default PromotionAdmin;
