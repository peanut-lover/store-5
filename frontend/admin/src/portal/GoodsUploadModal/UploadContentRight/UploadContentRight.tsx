import { styled } from '@src/lib/CustomStyledComponent';
import GoodsCategoryUploader from './GoodsCategoryUploader/GoodsCategoryUploader';
import GoodsDeliveryUploader from './GoodsDeliveryUploader/GoodsDeliveryUploader';
import GoodsGreenUploader from './GoodsGreenUploader/GoodsGreenUploader';
import GoodsStateUploader from './GoodsStateUploader/GoodsStateUploader';
import React from 'react';

interface Props {
  checkGreen: boolean;
  onHandleCheckGreen: () => void;
  onHandleDeliveryInfo: (id: number) => void;
  onHandleCategory: (id: number) => void;
  onHandleProductState: (productState: string) => void;
}

const UploadContentRight: React.FC<Props> = ({
  checkGreen,
  onHandleCheckGreen,
  onHandleCategory,
  onHandleDeliveryInfo,
  onHandleProductState,
}) => {
  return (
    <UploadContentRightContainer>
      <GoodsCategoryUploader onHandleCategory={onHandleCategory} />
      <GoodsStateUploader onHandleProductState={onHandleProductState} />
      <GoodsDeliveryUploader onHandleDeliveryInfo={onHandleDeliveryInfo} />
      <GoodsGreenUploader checkGreen={checkGreen} onHandleCheckGreen={onHandleCheckGreen} />
    </UploadContentRightContainer>
  );
};

const UploadContentRightContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 70%;
`;

export default UploadContentRight;
