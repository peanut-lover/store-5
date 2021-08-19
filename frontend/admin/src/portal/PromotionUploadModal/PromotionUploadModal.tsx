import React, { useCallback, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import Portal from '@src/portal/portal';
import PromotionImageUploader from '@src/portal/PromotionUploadModal/PromotionImageUploader/PromotionImageUploader';
import GoodsSearchInput from '@src/components/GoodsSearchInput/GoodsSearchInput';
import { AutoSearch } from '@src/types/Search';
import PromotionSelectedGoods from '@src/portal/PromotionUploadModal/PromotionSelectedGoods/PromotionSelectedGoods';

const PromotionUploadModal = () => {
  const [promotionFile, setPromotionFile] = useState<File>();
  const [selectedGoods, setSelectedGoods] = useState<AutoSearch>();

  const handleUploadFile = useCallback(
    (f: File) => {
      setPromotionFile(f);
    },
    [setPromotionFile]
  );

  const handleSelectedGoods = useCallback(
    (goods: AutoSearch) => {
      setSelectedGoods(goods);
    },
    [setSelectedGoods]
  );

  return (
    <Portal>
      <ModalContainer>
        <PromotionUploadContainer>
          <PromotionImageUploader onUploadFile={handleUploadFile} />
          <GoodsSearchInput onUpdateSelectedGoods={handleSelectedGoods} />
          {selectedGoods && <PromotionSelectedGoods selectedGoods={selectedGoods} />}
          <UploadButton>등록</UploadButton>
        </PromotionUploadContainer>
      </ModalContainer>
    </Portal>
  );
};

const ModalContainer = styled('div')`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PromotionUploadContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  height: 800px;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;

const UploadButton = styled('button')``;

export default PromotionUploadModal;
