import React from 'react';
import styled from 'styled-components';

interface ImageItemProps {
  src: string;
  active: boolean;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, active }: ImageItemProps) => {
  return <ImageItemContainer src={src} active={active}></ImageItemContainer>;
};

const ImageItemContainer = styled.img<ImageItemProps>`
  border: 1px solid ${(props) => (props.active && 'red') || 'transparent'};
  cursor: pointer;
  width: 100%;
`;

export default ImageItem;
