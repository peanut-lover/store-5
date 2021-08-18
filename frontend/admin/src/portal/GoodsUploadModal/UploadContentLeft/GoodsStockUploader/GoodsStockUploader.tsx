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
  stock: string;
  onChangeStock: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GoodsStockUploader: React.FC<Props> = ({ stock, onChangeStock }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>수량</UploaderLabel>
      <GoodsUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={formatNumber(stock)}
          onInput={onChangeStock}
          placeholder='Stock'
        ></UploaderInput>
        {stock && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsStockUploader;
