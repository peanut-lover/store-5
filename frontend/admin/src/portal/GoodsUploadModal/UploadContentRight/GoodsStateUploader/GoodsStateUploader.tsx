import { styled } from '@src/lib/CustomStyledComponent';
import { UploaderLabel } from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import React, { ChangeEvent, useCallback } from 'react';

interface Props {
  onHandleGoodsState: (goodsState: string) => void;
  goodsStates: string[];
  selectedGoodsState: string;
}

const GoodsStateUploader: React.FC<Props> = ({ onHandleGoodsState, goodsStates, selectedGoodsState }) => {
  const handleGoodsState = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onHandleGoodsState(e.target.value);
    },
    [onHandleGoodsState]
  );
  return (
    <>
      <UploaderLabel>상품 상태</UploaderLabel>
      <GoodsStateSelect onChange={handleGoodsState} value={selectedGoodsState}>
        {goodsStates.map((name, i) => (
          <option key={i} value={name}>
            {name}
          </option>
        ))}
      </GoodsStateSelect>
    </>
  );
};

const GoodsStateSelect = styled('select')`
  width: 50%;
  border-color: lightgray;
  padding: 0.5rem;
  height: 3rem;
`;
export default GoodsStateUploader;
