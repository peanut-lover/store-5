import React from 'react';

import { FaCheckSquare } from 'react-icons/fa';
import {
  GoodsUploadInputContainer,
  UploaderContainer,
  UploaderInput,
  UploaderLabel,
} from '@src/portal/GoodsUploadModal/UploadContentLeft/style';

interface Props {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const GoodsTitleUploader: React.FC<Props> = ({ title, onChangeTitle }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>제목</UploaderLabel>
      <GoodsUploadInputContainer>
        <UploaderInput
          type='text'
          maxLength={30}
          value={title}
          onInput={onChangeTitle}
          placeholder='Title'
        ></UploaderInput>
        {title && <FaCheckSquare size='1.4em' color='#2ac1bc' />}
      </GoodsUploadInputContainer>
    </UploaderContainer>
  );
};

export default GoodsTitleUploader;
