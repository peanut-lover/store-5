import React from 'react';

import { BsCheckCircle } from 'react-icons/bs';
import {
  ProductUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/ProductUploadModal/UploadContentLeft/style';

interface Props {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProductTitleUploader: React.FC<Props> = ({ title, onChangeTitle }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>제목</UploaderLabel>
      <ProductUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={title}
          onInput={onChangeTitle}
          placeholder='Title'
        ></UploaderInput>
        {title && <BsCheckCircle size='1.4em' color='#2ac1bc' />}
      </ProductUploadInputContainer>
    </UploaderContainer>
  );
};

export default ProductTitleUploader;
