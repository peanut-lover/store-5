import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

const MAX_IMAGE_LEN = 5;

interface Props {
  imagesLen: number;
  onClick: () => void;
}
const ReviewImageUploadButton: React.FC<Props> = ({ imagesLen, onClick }) => {
  return (
    <UploadButtonContainer disabled={imagesLen === MAX_IMAGE_LEN} onClick={onClick}>
      <AiOutlinePlus fontSize='2em' />
      <UploadImageCount>{`${imagesLen} / ${MAX_IMAGE_LEN}`}</UploadImageCount>
    </UploadButtonContainer>
  );
};

const UploadButtonContainer = styled.button<{ disabled: boolean }>`
  display: flex;
  border: none;
  min-width: 15%;
  min-height: 70%;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'pointer')};
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
  margin-right: 36px;
  :hover {
    opacity: 0.8;
  }
`;

const UploadImageCount = styled.span`
  margin-top: 12px;
  font-size: 1.1em;
`;

export default ReviewImageUploadButton;
