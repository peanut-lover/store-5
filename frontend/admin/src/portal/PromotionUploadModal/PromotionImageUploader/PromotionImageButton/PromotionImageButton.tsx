import { styled } from '@src/lib/CustomStyledComponent';
import { AiOutlinePicture } from 'react-icons/ai';
import React from 'react';
import { theme } from '@src/theme/theme';

const PromotionImageButton = () => {
  return (
    <Button>
      <AiOutlinePicture size='3em' color={theme.greenColor} />
      <Span>Upload</Span>
    </Button>
  );
};

const Button = styled(`button`)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
`;

const Span = styled('span')`
  font-size: 1.5em;
`;
export default PromotionImageButton;
