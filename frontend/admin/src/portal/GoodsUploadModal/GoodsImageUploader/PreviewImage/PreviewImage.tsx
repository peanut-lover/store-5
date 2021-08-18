import { styled } from '@src/lib/CustomStyledComponent';
import React from 'react';

interface Props {
  index: number;
  url: string;
  onDeleteImage: (index: number) => void;
}
const PreviewImage: React.FC<Props> = ({ index, url, onDeleteImage }) => (
  <PreviewImageContainer key={index}>
    <ImageDeleteButton onClick={() => onDeleteImage(index)}>X</ImageDeleteButton>
    <PreviewImageItem src={url} />
  </PreviewImageContainer>
);

const PreviewImageContainer = styled('div')`
  position: relative;
`;

const ImageDeleteButton = styled('button')`
  position: absolute;
  top: 16px;
  right: 12px;
  font-size: 1.2em;
  border-radius: 50%;
  border: none;
  background-color: #2ac1bc;
  color: white;
  cursor: pointer;
`;

const PreviewImageItem = styled('img')`
  box-sizing: border-box;
  height: 280px;
  width: 280px;
  min-height: 280px;
  min-width: 280px;
  padding: 24px;
  object-fit: cover;
`;

export default PreviewImage;
