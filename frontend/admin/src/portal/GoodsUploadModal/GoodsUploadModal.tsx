import React, { ChangeEvent, MouseEvent, useEffect, useState, useCallback } from 'react';

import Portal from '../portal';
import GoodsImageUploader from './GoodsImageUploader/GoodsImageUploader';
import { styled } from '@src/lib/CustomStyledComponent';
import useInput from '../../hooks/useInput';
import UploadContentLeft from '@src/portal/GoodsUploadModal/UploadContentLeft/UploadContentLeft';
import UploadContentRight from '@src/portal/GoodsUploadModal/UploadContentRight/UploadContentRight';
import { GoodsAPI } from '@src/apis/goodsAPI';
import { GoodsItem } from '@src/types/Goods';
import { GoodsImg } from '@src/types/GoodsImg';

import CloseButton from '@src/components/CloseButton/CloseButton';
import convertGoodsState from '@src/utils/convertGoodsState';

interface Props {
  onClose: () => void;
  goods?: GoodsItem | null;
}

const STATE_MAP = {
  S: '판매중',
  T: '임시저장',
  D: '삭제',
};

const GoodsUploadModal: React.FC<Props> = ({ onClose, goods }) => {
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const [oldImages, setOldImages] = useState<GoodsImg[]>([]);

  const [title, handleChangeTitle] = useInput(goods?.title ?? '');
  const [price, handleChangePrice] = useInput<number>(goods?.price ?? 0);
  const [stock, handleChangeStock] = useInput<number>(goods?.stock ?? 0);
  const [discountRate, setDiscountRate] = useState<number>(goods?.discountRate ?? 0);
  const [checkGreen, setCheckGreen] = useState<boolean>(goods?.isGreen ?? false);
  const [category, setCategory] = useState<number>(goods?.category.id ?? 0);
  const [goodsState, setGoodsState] = useState<string>(goods?.state ? STATE_MAP[goods.state] : STATE_MAP.S);
  const [deliveryInfo, setDeliveryInfo] = useState<number>(goods?.deliveryInfo ?? 0);
  const [submitActive, setSubmitActive] = useState<string>('');

  const handleSubmit = async (e: MouseEvent) => {
    const formData = new FormData();
    files.forEach((file: File) => formData.append('files', file));
    formData.append('title', title);
    formData.append('price', String(price));
    formData.append('stock', String(stock));
    formData.append('discountRate', String(discountRate));
    formData.append('isGreen', String(checkGreen));
    formData.append('deliveryInfo', `${deliveryInfo}`);
    formData.append('category', `${category}`);
    formData.append('state', convertGoodsState(goodsState));
    if (oldImages.length > 0) {
      formData.append('oldImages', oldImages.map((image) => image.id).join());
      formData.append('thumbnailUrl', oldImages[0].url);
    }

    try {
      const { result } = goods ? await GoodsAPI.updateGoods(formData, goods.id) : await GoodsAPI.createGoods(formData);
      if (result) onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateFiles = useCallback(
    (newFiles: File[]) => {
      setFiles((prev) => {
        return [...prev, ...newFiles];
      });
    },
    [setFiles]
  );

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles((prev) => prev.filter((f, i) => i !== index));
    },
    [setFiles]
  );

  const handleDeleteOldImage = useCallback(
    (id: number) => {
      setOldImages((prev) => prev.filter((image) => image.id !== id));
    },
    [setOldImages]
  );

  const handleCheckGreen = useCallback(() => {
    setCheckGreen((prev) => !prev);
  }, [setCheckGreen]);

  const handleCategory = useCallback(
    (id: number) => {
      setCategory(id);
    },
    [setCategory]
  );

  const handleGoodsState = useCallback(
    (goodsState: string) => {
      setGoodsState(goodsState);
    },
    [setGoodsState]
  );

  const handleDeliveryInfo = useCallback(
    (id: number) => {
      setDeliveryInfo(id);
    },
    [setDeliveryInfo]
  );

  const handleChangeDiscountRate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (isNaN(value)) return;
      if (value > 99 || value < 0) return;
      if (!Number.isInteger(value)) return;
      setDiscountRate(value);
    },
    [setDiscountRate]
  );

  const getUploadGoodsState = (): string[] => {
    const newGoodsStates = [...Object.values(STATE_MAP)];
    // goods가 없는 경우 신규 상품 등록이므로 상태 선택에 '삭제'가 없어야 합니다!
    if (!goods) {
      newGoodsStates.pop();
    }
    return newGoodsStates;
  };

  useEffect(() => {
    const updateSubmitActiveFalse = () => {
      if (submitActive) return setSubmitActive('');
    };
    const checkFormIsValidated = () => {
      if (!(title.length > 0 && price > 0 && stock > 0)) return updateSubmitActiveFalse();
      if (!goodsState) return updateSubmitActiveFalse();
      if (deliveryInfo === 0 || category === 0) return updateSubmitActiveFalse();
      if (files.length === 0 && oldImages.length === 0) return updateSubmitActiveFalse();
      return setSubmitActive('true');
    };
    checkFormIsValidated();
  }, [title, price, stock, category, goodsState, deliveryInfo, files, oldImages]);

  const fetchGoodsImgs = async (goodsId: number) => {
    try {
      const { result } = await GoodsAPI.getGoodsImgById(goodsId);
      setOldImages(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (goods) {
      fetchGoodsImgs(goods.id);
    }
  }, []);

  return (
    <Portal>
      <ModalContainer onClick={() => onClose()}>
        <GoodsUploadContainer onClick={(e) => e.stopPropagation()}>
          <GoodsImageUploader
            onHandleUpdateFiles={handleUpdateFiles}
            onHandleDeleteFile={handleDeleteFile}
            oldImages={oldImages}
            handleDeleteOldImage={handleDeleteOldImage}
          />
          <UploadContentContainer>
            <UploadContentLeft
              title={title}
              price={price}
              stock={stock}
              discountRate={discountRate}
              onHandleTitle={handleChangeTitle}
              onHandlePrice={handleChangePrice}
              onHandleStock={handleChangeStock}
              onHandleDiscount={handleChangeDiscountRate}
            />
            <UploadContentRightContainer>
              <UploadContentRight
                checkGreen={checkGreen}
                onHandleCheckGreen={handleCheckGreen}
                onHandleDeliveryInfo={handleDeliveryInfo}
                onHandleCategory={handleCategory}
                onHandleGoodsState={handleGoodsState}
                goods={goods}
                goodsStates={getUploadGoodsState()}
                selectedGoodsState={goodsState}
              />
            </UploadContentRightContainer>
          </UploadContentContainer>
          <SubmitButton onClick={handleSubmit} active={submitActive}>
            {goods ? '상품 수정' : '상품 등록'}
          </SubmitButton>
          <CloseButton onClick={onClose} />
        </GoodsUploadContainer>
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

const GoodsUploadContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 860px;
  height: 800px;
  margin: auto;
  padding: 0 28px;
  background-color: white;
  border-radius: 12px;
`;

const UploadContentContainer = styled('div')`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  padding: 1rem 0;
  border-top: 1px solid lightgray;
`;

const UploadContentRightContainer = styled('div')`
  width: 40%;
`;

const SubmitButton = styled('button')<{ active: string }>`
  width: 100%;
  height: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 4px;
  color: white;
  border: none;
  background-color: ${(props) => (props.active ? '#2ac1bc' : 'lightgray')};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  cursor: ${(props) => (props.active ? 'pointer' : 'none')};
  opacity: ${(props) => (props.active ? '1' : '0.8')};
`;

export default GoodsUploadModal;
