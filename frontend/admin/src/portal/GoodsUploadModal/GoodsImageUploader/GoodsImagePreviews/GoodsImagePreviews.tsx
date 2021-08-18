import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import PreviewImage from '@src/portal/GoodsUploadModal/GoodsImageUploader/PreviewImage/PreviewImage';

interface Props {
  previewImages: string[];
  onDeleteImage: (index: number) => void;
}

const GoodsImagePreviews: React.FC<Props> = ({ previewImages, onDeleteImage }) => {
  return (
    <PreviewImagesContainer>
      {previewImages.map((url, i) => (
        <PreviewImage key={i} index={i} url={url} onDeleteImage={onDeleteImage} />
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
