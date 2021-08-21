import React, { ChangeEvent, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import {
  GoodsUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import formatNumber from '@src/utils/formatToNumber';
interface Props {
  stock: number;
  onChangeStock: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GoodsStockUploader: React.FC<Props> = ({ stock, onChangeStock }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChnageStock = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            min={0}
            value={stock}
            onChange={handleChnageStock}
            onBlur={toggleEditing}
            placeholder='Stock'
          />
        ) : (
          <UploaderInput type='text' readOnly value={`${stock} 개`} onFocus={toggleEditing} placeholder='Stock' />
        )}

        {stock > 0 && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsStockUploader;
