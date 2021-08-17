import ProductDeliveryUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductDeliveryUploader/ProductDeliveryUploader';
import ProductGreenUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductGreenUploader/ProductGreenUploader';
import ProductStateUploader from '@src/portal/ProductUploadModal/UploadContentRight/ProductStateUploader/ProductStateUploader';
import React from 'react';

const UploadContentRight = () => {
  return (
    <>
      <ProductStateUploader />
      <ProductDeliveryUploader />
      <ProductGreenUploader />
    </>
  );
};

export default UploadContentRight;
