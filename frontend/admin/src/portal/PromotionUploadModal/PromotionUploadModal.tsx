import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import Portal from '@src/portal/portal';
import PromotionImageUploader from '@src/portal/PromotionUploadModal/PromotionImageUploader/PromotionImageUploader';
import GoodsSearchInput from '@src/components/GoodsSearchInput/GoodsSearchInput';
import { AutoSearchedItem } from '@src/types/Search';
import PromotionSelectedGoods from '@src/portal/PromotionUploadModal/PromotionSelectedGoods/PromotionSelectedGoods';
import PromotionAPI from '@src/apis/promotionAPI';
import CloseButton from '@src/components/CloseButton/CloseButton';

interface Props {
  onClose: () => void;
  updatePromotions: () => Promise<void>;
}

const PromotionUploadModal: React.FC<Props> = ({ updatePromotions, onClose }) => {
  const [promotionFile, setPromotionFile] = useState<File>();
  const [selectedGoods, setSelectedGoods] = useState<AutoSearchedItem>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleUploadFile = useCallback(
    (f: File) => {
      setPromotionFile(f);
    },
    [setPromotionFile]
  );

  const handleSelectedGoods = useCallback(
    (goods: AutoSearchedItem) => {
      setSelectedGoods(goods);
    },
    [setSelectedGoods]
  );

  const handleSubmit = async () => {
    if (disabled) return;
    setDisabled(true);
    const formData = new FormData();
    if (!promotionFile || !selectedGoods) return;
    formData.append('file', promotionFile);
    formData.append('goodsId', `${selectedGoods.id}`);
    try {
      const { result } = await PromotionAPI.createPromotion(formData);
      await updatePromotions();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
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
      <ModalContainer onClick={() => onClose()}>
        <PromotionUploadContainer onClick={(e) => e.stopPropagation()}>
          <PositionContainer>
            <PromotionImageUploader onUploadFile={handleUploadFile} />
            <GoodsSearchInput onUpdateSelectedGoods={handleSelectedGoods} />
            {selectedGoods && <PromotionSelectedGoods selectedGoods={selectedGoods} />}
            <UploadButton onClick={handleSubmit} disabled={submitDisabled}>
              등록
            </UploadButton>
          </PositionContainer>
          <CloseButton onClick={onClose} />
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
  left: 15%;
  bottom: 50px;
  width: 70%;
  height: 50px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  border: none;
  background-color: ${(props) => (props.disabled ? 'lightgray' : '#2ac1bc')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  cursor: ${(props) => (props.disabled ? 'none' : 'pointer')};
`;

export default PromotionUploadModal;
