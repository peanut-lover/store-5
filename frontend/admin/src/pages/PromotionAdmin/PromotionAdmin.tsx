import React, { useState } from 'react';

const PromotionAdmin = () => {
  const [openPromotionModal, setOpenPromotionModal] = useState<boolean>(false);
  return (
    <div>
      프로모션 관리 페이지
      <button>프로모션 등록</button>
    </div>
  );
};

export default PromotionAdmin;
