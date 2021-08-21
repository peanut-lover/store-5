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
        <UploaderInput type='number' max='99' min='0' value={discountRate} onInput={onChangeDiscountRate} />
        <span>%</span>
      </UploaderInputContainer>
    </UploaderContainer>
  );
};
export const UploaderInputContainer = styled('div')`
  display: flex;
  width: 15%;
  border-bottom: 1px solid lightgray;
`;
export const UploaderInput = styled('input')`
  border: none;
  width: 100%;
  line-height: 1.2em;
  font-size: 1.1em;
  outline: none;
`;
export default GoodsDiscountUploader;
