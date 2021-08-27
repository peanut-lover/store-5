import React, { ChangeEvent, useState } from 'react';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import {
  GoodsUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
interface Props {
  stock: number;
  onChangeStock: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GoodsStockUploader: React.FC<Props> = ({ stock, onChangeStock }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChnageStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || !Number.isInteger(value)) return;
    onChangeStock(e);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <UploaderContainer>
      <UploaderLabel>수량</UploaderLabel>
      <GoodsUploadInputContainer>
        {isEditing ? (
          <UploaderInput
            type='number'
            value={stock}
            onChange={handleChnageStock}
            onBlur={toggleEditing}
            placeholder='Stock'
          />
        ) : (
          <UploaderInput type='text' readOnly value={`${stock} 개`} onFocus={toggleEditing} placeholder='Stock' />
        )}

        {stock > 0 && <FaCheck size='1rem' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsStockUploader;
