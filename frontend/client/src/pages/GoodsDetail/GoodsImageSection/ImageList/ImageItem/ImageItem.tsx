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
  border: 1px solid ${(props) => (props.isActivated && 'red') || 'transparent'};
  cursor: pointer;
  width: 100%;
`;

export default ImageItem;
