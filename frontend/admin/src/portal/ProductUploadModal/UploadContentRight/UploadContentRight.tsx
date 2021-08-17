import { styled } from '@src/lib/CustomStyledComponent';
import ProductCategoryUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductCategoryUploader/ProductCategoryUploader';
import ProductDeliveryUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductDeliveryUploader/ProductDeliveryUploader';
import ProductGreenUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductGreenUploader/ProductGreenUploader';
import ProductStateUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductStateUploader/ProductStateUploader';
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
      <ProductCategoryUploader onHandleCategory={onHandleCategory} />
      <ProductStateUploader onHandleProductState={onHandleProductState} />
      <ProductDeliveryUploader onHandleDeliveryInfo={onHandleDeliveryInfo} />
      <ProductGreenUploader checkGreen={checkGreen} onHandleCheckGreen={onHandleCheckGreen} />
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
