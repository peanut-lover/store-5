import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/ProductUploadModal/UploadContentLeft/style';
import React, { ChangeEvent, useCallback, useEffect } from 'react';

interface Props {
  onHandleProductState: (productState: string) => void;
}

const PRODUCT_STATE = ['판매중', '임시저장'];

const ProductStateUploader: React.FC<Props> = ({ onHandleProductState }) => {
  const handleProductState = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onHandleProductState(e.target.value);
    },
    [onHandleProductState]
  );
  useEffect(() => {
    onHandleProductState(PRODUCT_STATE[0]);
  }, []);
  return (
    <>
      <UploaderLabel>상품 상태</UploaderLabel>
      <ProductStateSelect onChange={handleProductState}>
        {PRODUCT_STATE.map((name, i) => (
          <option key={i} value={name}>
            {name}
          </option>
        ))}
      </ProductStateSelect>
    </>
  );
};

const ProductStateSelect = styled('select')`
  width: 60%;
  margin-bottom: 24px;
`;
export default ProductStateUploader;
