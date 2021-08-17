import React, { ChangeEvent } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import {
  ProductUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/ProductUploadModal/UploadContentLeft/style';
import formatNumber from '@src/utils/formatNumber';

interface Props {
  price: string;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
}
const ProductPriceUploader: React.FC<Props> = ({ price, onChangePrice }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>가격</UploaderLabel>
      <ProductUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={formatNumber(price)}
          onInput={onChangePrice}
          placeholder='Price'
        ></UploaderInput>
        {price && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </ProductUploadInputContainer>
    </UploaderContainer>
  );
};

export default ProductPriceUploader;
