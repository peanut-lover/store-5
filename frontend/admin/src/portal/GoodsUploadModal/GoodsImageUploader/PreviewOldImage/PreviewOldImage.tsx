import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import React from 'react';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

interface Props {
  id: number;
  index: number;
  url: string;
  onDeleteOldImage: (index: number) => void;
}
const PreviewOldImage: React.FC<Props> = ({ id, index, url, onDeleteOldImage }) => (
  <PreviewOldImageContainer>
    {index === 0 && <Thumbnail bgcolor={theme.greenColor}>썸네일</Thumbnail>}
    <ImageDeleteButton onClick={() => onDeleteOldImage(id)} bgcolor={theme.greenColor}>
      <FaTimes />
    </ImageDeleteButton>
    <PreviewOldImageItem src={url} />
  </PreviewOldImageContainer>
);

const PreviewOldImageContainer = styled('div')`
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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.bgcolor};
  color: #fff;
  cursor: pointer;
`;

const PreviewOldImageItem = styled('img')`
  box-sizing: border-box;
  height: 240px;
  width: 240px;
  min-height: 240px;
  min-width: 240px;
  padding: 12px;
  object-fit: cover;
`;

export default PreviewOldImage;
