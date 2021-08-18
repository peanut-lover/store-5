import { styled } from '@src/lib/CustomStyledComponent';
import GoodsDiscountUploader from './GoodsDiscountUploader/GoodsDiscountUploader';
import GoodsPriceUploader from './GoodsPriceUploader/GoodsPriceUploader';
import GoodsStockUploader from './GoodsStockUploader/GoodsStockUploader';
import GoodsTitleUploader from './GoodsTitleUploader/GoodsTitleUploader';
import React, { ChangeEvent } from 'react';

interface Props {
  title: string;
  price: string;
  stock: string;
  discountRate: string;
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
    <UploadContentLeftContainer>
      <GoodsTitleUploader title={title} onChangeTitle={onHandleTitle} />
      <GoodsPriceUploader price={price} onChangePrice={onHandlePrice} />
      <GoodsStockUploader stock={stock} onChangeStock={onHandleStock} />
      <GoodsDiscountUploader discountRate={discountRate} onChangeDiscountRate={onHandleDiscount} />
    </UploadContentLeftContainer>
  );
};

const UploadContentLeftContainer = styled('div')`
  box-sizing: border-box;
  width: 60%;
`;
export default UploadContentLeft;
