import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import originStyled from 'styled-components';
import PreviewImage from '@src/portal/GoodsUploadModal/GoodsImageUploader/PreviewImage/PreviewImage';
import { GoodsImg } from '@src/types/GoodsImg';
import PreviewOldImage from '@src/portal/GoodsUploadModal/GoodsImageUploader/PreviewOldImage/PreviewOldImage';
import { theme } from '@src/theme/theme';

interface Props {
  previewImages: string[];
  onDeleteImage: (index: number) => void;
  handleDeleteOldImage: (index: number) => void;
  oldImages: GoodsImg[];
}

const GoodsImagePreviews: React.FC<Props> = ({ previewImages, onDeleteImage, oldImages, handleDeleteOldImage }) => {
  return (
    <GoodsImagePreviewsContainer>
      <PreviewImagesContainer>
        {oldImages.map((oldImage, i) => (
          <PreviewOldImage
            key={oldImage.id}
            id={oldImage.id}
            index={i}
            url={oldImage.url}
            onDeleteOldImage={handleDeleteOldImage}
          />
        ))}
        {previewImages.map((url, i) => (
          <PreviewImage
            key={i}
            index={i}
            url={url}
            onDeleteImage={onDeleteImage}
            isEmptyOldImage={oldImages.length === 0}
          />
        ))}
      </PreviewImagesContainer>
    </GoodsImagePreviewsContainer>
  );
};

const GoodsImagePreviewsContainer = originStyled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
  margin-bottom: 0.5rem;
  &::-webkit-scrollbar {
    display: block;
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${theme.dustWhite};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.line};
  }
`;

const PreviewImagesContainer = styled('ul')`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export default GoodsImagePreviews;
