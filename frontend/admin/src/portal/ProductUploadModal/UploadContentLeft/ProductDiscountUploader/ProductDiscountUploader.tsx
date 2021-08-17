import React, { ChangeEvent } from 'react';
import {
  ProductUploadInputContainer,
  UploaderContainer,
  UploaderLabel,
} from '@src/portal/ProductUploadModal/UploadContentLeft/style';
import { styled } from '@src/lib/CustomStyledComponent';

interface Props {
  discountRate: string;
  onChangeDiscountRate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductDiscountUploader: React.FC<Props> = ({ discountRate, onChangeDiscountRate }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>할인률</UploaderLabel>
      <ProductUploadInputContainer>
        <UploaderInput
          type='number'
          max='99'
          min='0'
          value={discountRate}
          onInput={onChangeDiscountRate}
        ></UploaderInput>
      </ProductUploadInputContainer>
    </UploaderContainer>
  );
};
export const UploaderInput = styled('input')`
  border: none;
  width: 100%;
  line-height: 1.2em;
  font-size: 1.1em;
  outline: none;
`;
export default ProductDiscountUploader;
