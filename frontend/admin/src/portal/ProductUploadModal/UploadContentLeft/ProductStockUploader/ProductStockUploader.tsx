import React, { ChangeEvent } from 'react';

interface Props {
  stock: number;
  onChangeStock: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductStockUploader: React.FC<Props> = ({ stock, onChangeStock }) => {
  return <div>hi</div>;
};

export default ProductStockUploader;
