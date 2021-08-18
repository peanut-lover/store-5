import React, { ChangeEvent } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import {
  GoodsUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import formatNumber from '@src/utils/formatNumber';

interface Props {
  price: string;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
}
const GoodsPriceUploader: React.FC<Props> = ({ price, onChangePrice }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>가격</UploaderLabel>
      <GoodsUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={formatNumber(price)}
          onInput={onChangePrice}
          placeholder='Price'
        ></UploaderInput>
        {price && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsPriceUploader;
