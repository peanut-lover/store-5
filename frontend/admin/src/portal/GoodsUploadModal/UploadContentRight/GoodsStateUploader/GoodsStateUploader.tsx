import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import React, { ChangeEvent, useCallback, useEffect } from 'react';

interface Props {
  onHandleProductState: (productState: string) => void;
  goodsStates: string[];
}

const GoodsStateUploader: React.FC<Props> = ({ onHandleProductState, goodsStates }) => {
  const handleProductState = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onHandleProductState(e.target.value);
    },
    [onHandleProductState]
  );
  useEffect(() => {
    onHandleProductState(goodsStates[0]);
  }, []);
  return (
    <>
      <UploaderLabel>상품 상태</UploaderLabel>
      <ProductStateSelect onChange={handleProductState}>
        {goodsStates.map((name, i) => (
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
export default GoodsStateUploader;
