import React, { ChangeEvent } from 'react';

interface Props {
  price: number;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
}
const ProductPriceUploader: React.FC<Props> = ({ price, onChangePrice }) => {
  return <div>hi</div>;
};

export default ProductPriceUploader;
