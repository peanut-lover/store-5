import { styled } from '@src/lib/CustomStyledComponent';
import { AiOutlinePicture } from 'react-icons/ai';
import React from 'react';
import { theme } from '@src/theme/theme';

const PromotionImageButton = () => {
  return (
    <Button>
      <AiOutlinePicture size='3em' color={theme.greenColor} />
      <Span>프로모션 이미지</Span>
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
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Span = styled('span')`
  margin-top: 1em;
  font-size: 1em;
  color: gray;
`;
export default PromotionImageButton;
