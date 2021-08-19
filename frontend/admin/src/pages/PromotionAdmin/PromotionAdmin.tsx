import PromotionAPI from '@src/apis/promotionAPI';
import PromotionList from '@src/pages/PromotionAdmin/PromotionList/PromotionList';
import PromotionUploadModal from '@src/portal/PromotionUploadModal/PromotionUploadModal';
import { Promotion } from '@src/types/Promotion';
import React, { useCallback, useEffect, useState } from 'react';

const PromotionAdmin = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [openPromotionModal, setOpenPromotionModal] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setOpenPromotionModal(false);
  }, [setOpenPromotionModal]);

  const fetchingPromotions = useCallback(async () => {
    try {
      const { result } = await PromotionAPI.getPromotions();
      setPromotions(result);
    } catch (err) {
      console.error(err);
    }
  }, [setPromotions]);

  useEffect(() => {
    fetchingPromotions();
  }, []);
  return (
    <div>
      프로모션 관리 페이지
      <button onClick={() => setOpenPromotionModal(true)}>프로모션 등록</button>
      <PromotionList promotions={promotions} />
      {openPromotionModal && <PromotionUploadModal onClose={handleCloseModal} />}
    </div>
  );
};

export default PromotionAdmin;
