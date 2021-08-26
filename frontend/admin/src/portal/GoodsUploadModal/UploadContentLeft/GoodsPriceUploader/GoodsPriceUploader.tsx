import React, { ChangeEvent, useState } from 'react';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import {
  GoodsUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import formatNumber from '@src/utils/formatToNumber';

interface Props {
  price: number;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
}
const GoodsPriceUploader: React.FC<Props> = ({ price, onChangePrice }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePrice(e);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <UploaderContainer>
      <UploaderLabel>가격</UploaderLabel>
      <GoodsUploadInputContainer>
        {isEditing ? (
          <UploaderInput
            type='number'
            min={0}
            value={price}
            onChange={handleChange}
            onBlur={toggleEditing}
            placeholder='Price'
          />
        ) : (
          <UploaderInput type='text' readOnly value={formatNumber(price)} onFocus={toggleEditing} placeholder='Price' />
        )}

        {price > 0 && <FaCheck size='1rem' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsPriceUploader;
