import React from 'react';

interface Props {
  checkGreen: boolean;
  onHandleCheckGreen: () => void;
}

const ProductGreenUploader: React.FC<Props> = ({ checkGreen, onHandleCheckGreen }) => {
  return <div>hi</div>;
};

export default ProductGreenUploader;
