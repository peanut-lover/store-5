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
  stock: string;
  onChangeStock: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductStockUploader: React.FC<Props> = ({ stock, onChangeStock }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>수량</UploaderLabel>
      <ProductUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={formatNumber(stock)}
          onInput={onChangeStock}
          placeholder='Stock'
        ></UploaderInput>
        {stock && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </ProductUploadInputContainer>
    </UploaderContainer>
  );
};

export default ProductStockUploader;
