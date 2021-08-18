import React, { useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import GoodsUploadModal from '@src/portal/GoodsUploadModal/GoodsUploadModal';

const Main = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  return (
    <MainContainer>
      <button
        onClick={() => {
          setOpenUploadModal(true);
        }}
      >
        제품 등록
      </button>
      {openUploadModal && <GoodsUploadModal onClose={() => setOpenUploadModal(false)} />}
    </MainContainer>
  );
};

const MainContainer = styled('div')`
  width: 1200px;
`;

export default Main;
