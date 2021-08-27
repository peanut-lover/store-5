import React, { ChangeEvent } from 'react';
import { UploaderContainer, UploaderLabel } from '@src/portal/GoodsUploadModal/UploadContentLeft/style';
import { styled } from '@src/lib/CustomStyledComponent';

interface Props {
  discountRate: number;
  onChangeDiscountRate: (e: ChangeEvent<HTMLInputElement>) => void;
}

const GoodsDiscountUploader: React.FC<Props> = ({ discountRate, onChangeDiscountRate }) => {
  return (
    <UploaderContainer>
      <UploaderLabel>할인율</UploaderLabel>
      <UploaderInputContainer>
        <UploaderInput value={discountRate} onChange={onChangeDiscountRate} />
        <span>%</span>
      </UploaderInputContainer>
    </UploaderContainer>
  );
};
export const UploaderInputContainer = styled('div')`
  display: flex;
  width: 100px;
  height: 48px;
  font-weight: 600;
  align-items: center;
`;
export const UploaderInput = styled('input')`
  border: none;
  width: 100%;
  line-height: 1.2em;
  font-size: 1rem;
  outline: none;
  font-weight: 400;
`;
export default GoodsDiscountUploader;
