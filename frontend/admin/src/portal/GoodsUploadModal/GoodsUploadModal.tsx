import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useCallback } from 'react';
import Portal from '../portal';
import ProductImageUploader from './GoodsImageUploader/GoodsImageUploader';
import { styled } from '@src/lib/CustomStyledComponent';
import useInput from '../../hooks/useInput';
import UploadContentLeft from '@src/portal/GoodsUploadModal/UploadContentLeft/UploadContentLeft';
import UploadContentRight from '@src/portal/GoodsUploadModal/UploadContentRight/UploadContentRight';
import { GoodsAPI } from '@src/apis/goodsAPI';

interface Props {
  onClose: () => void;
}

const GoodsUploadModal: React.FC<Props> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const [title, handleChangeTitle] = useInput('');
  const [price, handleChangePrice] = useInput('');
  const [stock, handleChangeStock] = useInput('');
  const [discountRate, setDiscountRate] = useState<string>('');
  const [checkGreen, setCheckGreen] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [productState, setProductState] = useState<string>('');
  const [deliveryInfo, setDeliveryInfo] = useState<number>(0);
  const [submitActive, setSubmitActive] = useState<string>('');

  const handleSubmit = async (e: MouseEvent) => {
    const formData = new FormData();
    files.forEach((file: File) => formData.append('files', file));
    formData.append('title', title);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('discountRate', discountRate);
    formData.append('isGreen', checkGreen ? '1' : '0');
    formData.append('deliveryInfo', `${deliveryInfo}`);
    formData.append('category', `${category}`);
    formData.append('state', productState);
    try {
      const { result } = await GoodsAPI.createGoods(formData);
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

  const handleCheckGreen = useCallback(() => {
    setCheckGreen((prev) => !prev);
  }, [setCheckGreen]);

  const handleCategory = useCallback(
    (id: number) => {
      setCategory(id);
    },
    [setCategory]
  );

  const handleProductState = useCallback(
    (productState: string) => {
      setProductState(productState);
    },
    [setProductState]
  );

  const handleDeliveryInfo = useCallback(
    (id: number) => {
      setDeliveryInfo(id);
    },
    [setDeliveryInfo]
  );

  const handleChangeDiscountRate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 2) return;
      setDiscountRate(e.target.value);
    },
    [setDiscountRate]
  );

  useEffect(() => {
    const updateSubmitActiveFalse = () => {
      if (submitActive) return setSubmitActive('');
    };
    const checkFormIsValidated = () => {
      if (!(title.length > 0 && price.length > 0 && stock.length > 0)) return updateSubmitActiveFalse();
      if (!productState) return updateSubmitActiveFalse();
      if (deliveryInfo === 0 || category === 0) return updateSubmitActiveFalse();
      if (files.length === 0) return updateSubmitActiveFalse();
      return setSubmitActive('true');
    };
    checkFormIsValidated();
  }, [title, price, stock, category, productState, deliveryInfo, files]);

  return (
    <Portal>
      <ModalContainer>
        <ProductUploadContainer>
          <ProductImageUploader onHandleUpdateFiles={handleUpdateFiles} onHandleDeleteFile={handleDeleteFile} />
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
                onHandleProductState={handleProductState}
              />
              <SubmitButton onClick={handleSubmit} active={submitActive}>
                상품 등록
              </SubmitButton>
            </UploadContentRightContainer>
          </UploadContentContainer>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ProductUploadContainer>
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

const ProductUploadContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 860px;
  height: 800px;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;

const UploadContentContainer = styled('div')`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: calc(100% - 56px);
  height: calc(812px - 35%);
  padding: 28px 0;
  margin: 0 28px 0 28px;
  border-top: 1px solid lightgray;
`;

const UploadContentRightContainer = styled('div')`
  width: 40%;
`;

const SubmitButton = styled('button')<{ active: string }>`
  width: 80%;
  height: 13%;
  font-size: 1.6em;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: ${(props) => (props.active ? '#2ac1bc' : 'lightgray')};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  cursor: ${(props) => (props.active ? 'pointer' : 'none')};
`;

const CloseButton = styled('button')`
  position: absolute;
  top: -0.5em;
  right: -0.5em;
  font-size: 1.8em;
  border-radius: 50%;
  background-color: #2ac1bc;
  color: white;
  border: none;
  cursor: pointer;
`;

export default GoodsUploadModal;
