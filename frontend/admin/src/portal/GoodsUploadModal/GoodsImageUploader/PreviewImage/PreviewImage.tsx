import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import React from 'react';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

interface Props {
  index: number;
  url: string;
  isEmptyOldImage: boolean;
  onDeleteImage: (index: number) => void;
}
const PreviewImage: React.FC<Props> = ({ index, url, onDeleteImage, isEmptyOldImage }) => (
  <PreviewImageContainer key={index}>
    {isEmptyOldImage && index === 0 && <Thumbnail bgcolor={theme.greenColor}>썸네일</Thumbnail>}
    <ImageDeleteButton onClick={() => onDeleteImage(index)} bgcolor={theme.greenColor}>
      <FaTimes />
    </ImageDeleteButton>
    <PreviewImageItem src={url} />
  </PreviewImageContainer>
);

const PreviewImageContainer = styled('div')`
  position: relative;
`;

const Thumbnail = styled('div')<{ bgcolor: string }>`
  position: absolute;
  width: 52px;
  top: 30px;
  left: 30px;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;
  color: #fff;
  background-color: ${(props) => props.bgcolor};
  text-align: center;
`;
const ImageDeleteButton = styled('button')<{ bgcolor: string }>`
  position: absolute;
  top: 16px;
  right: 12px;
  font-size: 1.2em;
  border-radius: 50%;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  color: #fff;
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
