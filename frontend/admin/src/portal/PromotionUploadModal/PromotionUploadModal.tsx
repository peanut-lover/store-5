import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import Portal from '@src/portal/portal';
import PromotionImageUploader from '@src/portal/PromotionUploadModal/PromotionImageUploader/PromotionImageUploader';
import GoodsSearchInput from '@src/components/GoodsSearchInput/GoodsSearchInput';
import { AutoSearch } from '@src/types/Search';
import PromotionSelectedGoods from '@src/portal/PromotionUploadModal/PromotionSelectedGoods/PromotionSelectedGoods';

const PromotionUploadModal = () => {
  const [promotionFile, setPromotionFile] = useState<File>();
  const [selectedGoods, setSelectedGoods] = useState<AutoSearch>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

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

  const handleSubmit = () => {
    const formData = new FormData();
  };

  useEffect(() => {
    if (promotionFile && selectedGoods && submitDisabled) {
      setSubmitDisabled(false);
    } else if ((!promotionFile || !selectedGoods) && !submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [promotionFile, selectedGoods, submitDisabled, setSubmitDisabled]);

  return (
    <Portal>
      <ModalContainer>
        <PromotionUploadContainer>
          <PositionContainer>
            <PromotionImageUploader onUploadFile={handleUploadFile} />
            <GoodsSearchInput onUpdateSelectedGoods={handleSelectedGoods} />
            {selectedGoods && <PromotionSelectedGoods selectedGoods={selectedGoods} />}
            <UploadButton disabled={submitDisabled}>등록</UploadButton>
          </PositionContainer>
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

const PositionContainer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UploadButton = styled('button')<{ disabled: boolean }>`
  position: absolute;
  left: 25%;
  bottom: 50px;
  width: 50%;
  height: 8%;
  font-size: 1.6em;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: ${(props) => (props.disabled ? 'lightgray' : '#2ac1bc')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  cursor: ${(props) => (props.disabled ? 'none' : 'pointer')};
`;

export default PromotionUploadModal;
