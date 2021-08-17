import React, { MouseEvent, useState } from 'react';
import { useCallback } from 'react';
import Portal from '../portal';
import ProductImageUploader from './ProductImageUploader/ProductImageUploader';
import ProductTitleUploader from './ProductTitleUploader/ProductTitleUploader';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const ProductUploadModal = () => {
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const [title, handleChangeTitle] = useInput('');

  const handleUpdateFiles = useCallback(
    (newFiles: File[]) => {
      setFiles((prev) => {
        return [...prev, ...newFiles];
      });
    },
    [setFiles]
  );

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file: File) => formData.append('files', file));
    formData.append('title', title);
    console.log(formData);
  };

  return (
    <Portal>
      <ModalContainer>
        <ProductUploadContainer>
          <ProductImageUploader onHandleUpdateFiles={handleUpdateFiles} />
          <ProductTitleUploader title={title} onChangeTitle={handleChangeTitle} />
          <button onClick={handleSubmit}>제출</button>
        </ProductUploadContainer>
      </ModalContainer>
    </Portal>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ProductUploadContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;

export default ProductUploadModal;
