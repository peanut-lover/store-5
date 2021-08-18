import { styled } from '@src/lib/CustomStyledComponent';

export const UploaderContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;
export const UploaderLabel = styled('label')`
  font-size: 1.2em;
  margin-bottom: 8px;
  font-weight: 700;
  color: #2ac1bc;
`;

export const GoodsUploadInputContainer = styled('div')`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  border-bottom: 1px solid lightgray;
  height: 3em;
`;
export const UploaderInput = styled('input')`
  border: none;
  width: 85%;
  line-height: 1.2em;
  font-size: 1.1em;
  outline: none;
`;
