import ProductDiscountUploader from '@src/portal/ProductUploadModal/UploadContentLeft/ProductDiscountUploader/ProductDiscountUploader';
import ProductPriceUploader from '@src/portal/ProductUploadModal/UploadContentLeft/ProductPriceUploader/ProductPriceUploader';
import ProductStockUploader from '@src/portal/ProductUploadModal/UploadContentLeft/ProductStockUploader/ProductStockUploader';
import ProductTitleUploader from '@src/portal/ProductUploadModal/UploadContentLeft/ProductTitleUploader/ProductTitleUploader';
import React, { ChangeEvent } from 'react';

interface Props {
  title: string;
  price: number;
  stock: number;
  discountRate: number;
  onHandleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onHandlePrice: (e: ChangeEvent<HTMLInputElement>) => void;
  onHandleStock: (e: ChangeEvent<HTMLInputElement>) => void;
  onHandleDiscount: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadContentLeft: React.FC<Props> = ({
  title,
  price,
  stock,
  discountRate,
  onHandleTitle,
  onHandlePrice,
  onHandleStock,
  onHandleDiscount,
}) => {
  return (
    <>
      <ProductTitleUploader title={title} onChangeTitle={onHandleTitle} />
      <ProductPriceUploader price={price} onChangePrice={onHandlePrice} />
      <ProductStockUploader stock={stock} onChangeStock={onHandleStock} />
      <ProductDiscountUploader discountRate={discountRate} onChangeDiscountRate={onHandleDiscount} />
    </>
  );
};

export default UploadContentLeft;
