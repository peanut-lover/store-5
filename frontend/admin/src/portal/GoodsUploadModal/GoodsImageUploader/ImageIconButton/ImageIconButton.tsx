import { styled } from '@src/lib/CustomStyledComponent';
import React, { MouseEvent } from 'react';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';

interface Props {
  onClick: (e: MouseEvent) => void;
}

const ImageIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <FaPlus size='3rem' cursor='pointer' />
      <Span>이미지 업로드</Span>
    </Button>
  );
};

const Button = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 160px;
  padding: 15px;
  color: #2ac1bc;
`;

const Span = styled('span')`
  margin-top: 8px;
  font-weight: 700;
`;

export default ImageIconButton;
