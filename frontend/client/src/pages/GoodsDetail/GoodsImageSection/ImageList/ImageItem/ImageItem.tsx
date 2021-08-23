import theme from '@src/theme/theme';
import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  index: number;
  src: string;
  isActivated: boolean;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const ImageItem: React.FC<Props> = ({ index, src, isActivated, setActive }: Props) => {
  const onMouseOver = useCallback((e) => {
    setActive(index);
  }, []);
  return <ImageItemContainer src={src} isActivated={isActivated} onMouseOver={onMouseOver} />;
};

const ImageItemContainer = styled.img<{ isActivated: boolean }>`
  border: 1px solid ${(props) => (props.isActivated ? theme.primary : 'transparent')};
  cursor: pointer;
  object-fit: cover;
  height: 80px;
  width: 80px;
`;

export default ImageItem;
