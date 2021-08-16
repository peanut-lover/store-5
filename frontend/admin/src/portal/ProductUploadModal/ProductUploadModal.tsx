import React, { useState } from 'react';
import { useCallback } from 'react';
import Portal from 'src/portal/portal';
import ProductImageUploader from 'src/portal/ProductUploadModal/ProductImageUploader/ProductImageUploader';
import ProductTitleUploader from 'src/portal/ProductUploadModal/ProductTitleUploader/ProductTitleUploader';
import styled from 'styled-components';

const ProductUploadModal = () => {
  const [files, setFiles] = useState<File[]>([]); // 이미지 file 저장
  const handleUpdateFiles = useCallback((newFiles: File[] | File) => {
    setFiles((prev) => {
      if (Array.isArray(newFiles)) return { ...prev, ...newFiles };
      return { ...prev, File };
    });
  }, []);
  return (
    <Portal>
      <ModalContainer>
        <ProductUploadContainer>
          <ProductImageUploader onHandleUpdateFiles={handleUpdateFiles} />
          <ProductTitleUploader />
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
