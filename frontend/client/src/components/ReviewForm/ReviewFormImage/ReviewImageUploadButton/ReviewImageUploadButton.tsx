import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  onClick: () => void;
}
const ReviewImageUploadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <UploadButtonContainer onClick={onClick}>
      <AiOutlinePlus fontSize='2em' />
      <UploadImageCount>{`0 / 5`}</UploadImageCount>
    </UploadButtonContainer>
  );
};

const UploadButtonContainer = styled.div`
  display: flex;
  min-width: 15%;
  min-height: 70%;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  cursor: pointer;
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
