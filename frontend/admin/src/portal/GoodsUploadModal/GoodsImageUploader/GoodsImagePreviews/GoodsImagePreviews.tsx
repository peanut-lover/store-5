import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import PreviewImage from '@src/portal/GoodsUploadModal/GoodsImageUploader/PreviewImage/PreviewImage';
import { GoodsImg } from '@src/types/GoodsImg';
import PreviewOldImage from '@src/portal/GoodsUploadModal/GoodsImageUploader/PreviewOldImage/PreviewOldImage';

interface Props {
  previewImages: string[];
  onDeleteImage: (index: number) => void;
  handleDeleteOldImage: (index: number) => void;
  oldImages: GoodsImg[];
}

const GoodsImagePreviews: React.FC<Props> = ({ previewImages, onDeleteImage, oldImages, handleDeleteOldImage }) => {
  return (
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
  );
};

const PreviewImagesContainer = styled('ul')`
  display: flex;
  padding: 0;
  margin: 0;
  overflow-x: auto;
`;

export default GoodsImagePreviews;
