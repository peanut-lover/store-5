import React from 'react';

interface Props {
  onHandleProductState: (productState: string) => void;
}

const ProductStateUploader: React.FC<Props> = ({ onHandleProductState }) => {
  return <div>hi</div>;
};

export default ProductStateUploader;
