import React, { ChangeEvent } from 'react';

interface Props {
  discountRate: number;
  onChangeDiscountRate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductDiscountUploader: React.FC<Props> = ({ discountRate, onChangeDiscountRate }) => {
  return <div>hi</div>;
};

export default ProductDiscountUploader;
