import { styled } from '@src/lib/CustomStyledComponent';
import React, { MouseEvent } from 'react';
import { BiImageAdd } from 'react-icons/bi';

interface Props {
  onClick: (e: MouseEvent) => void;
}

const ImageIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <BiImageAdd size='6em' cursor='pointer' />
      <Span>이미지 업로드</Span>
    </Button>
  );
};

const Button = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 25px;
  color: #2ac1bc;
  margin-right: 25px;
`;

const Span = styled('span')`
  margin-top: 8px;
  font-weight: 700;
`;

export default ImageIconButton;
