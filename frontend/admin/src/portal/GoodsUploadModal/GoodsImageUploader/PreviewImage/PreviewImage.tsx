import { styled } from '@src/lib/CustomStyledComponent';
import { theme } from '@src/theme/theme';
import React from 'react';

interface Props {
  index: number;
  url: string;
  onDeleteImage: (index: number) => void;
}
const PreviewImage: React.FC<Props> = ({ index, url, onDeleteImage }) => (
  <PreviewImageContainer key={index}>
    {index === 0 && <Thumbnail bgColor={theme.greenColor}>썸네일</Thumbnail>}
    <ImageDeleteButton onClick={() => onDeleteImage(index)} bgColor={theme.greenColor}>
      X
    </ImageDeleteButton>
    <PreviewImageItem src={url} />
  </PreviewImageContainer>
);

const PreviewImageContainer = styled('div')`
  position: relative;
`;

const Thumbnail = styled('div')<{ bgColor: string }>`
  position: absolute;
  width: 52px;
  top: 30px;
  left: 30px;
  border-radius: 8px;
  color: #fff;
  background-color: ${(props) => props.bgColor};
  text-align: center;
`;
const ImageDeleteButton = styled('button')<{ bgColor: string }>`
  position: absolute;
  top: 16px;
  right: 12px;
  font-size: 1.2em;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.bgColor};
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
