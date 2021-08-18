import { styled } from '@src/lib/CustomStyledComponent';
import ImageIconButton from '@src/portal/GoodsUploadModal/GoodsImageUploader/ImageIconButton/ImageIconButton';
import React, { useCallback, useRef, useState } from 'react';
import GoodsImagePreviews from './GoodsImagePreviews/GoodsImagePreviews';

interface Props {
  onHandleUpdateFiles: (newFiles: File[]) => void;
  onHandleDeleteFile: (index: number) => void;
}

const GoodsImageUploader: React.FC<Props> = ({ onHandleUpdateFiles, onHandleDeleteFile }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(() => {
    imageInput.current && imageInput.current.click();
  }, [imageInput.current]);

  const handleAddImages = useCallback(
    (e) => {
      const addFiles: File[] = [];
      const addImages: string[] = [];
      Array.prototype.forEach.call(e.target.files, (f: File) => {
        const imageUrl = URL.createObjectURL(f);
        addFiles.push(f);
        addImages.push(imageUrl);
      });
      onHandleUpdateFiles(addFiles);
      setPreviewImages((prev) => [...prev, ...addImages]);
    },
    [onHandleUpdateFiles, setPreviewImages]
  );

  const handleDeleteImage = useCallback(
    (index: number) => {
      setPreviewImages((prev) => prev.filter((url, i) => i !== index));
      onHandleDeleteFile(index);
    },
    [onHandleDeleteFile, setPreviewImages]
  );
  return (
    <ImageUploaderContainer>
      <ImageIconButton onClick={handleImageUpload} />
      <GoodsImagePreviews previewImages={previewImages} onDeleteImage={handleDeleteImage} />
      <input ref={imageInput} type='file' accept='.jpg, .png, .jpeg' hidden multiple onChange={handleAddImages} />
    </ImageUploaderContainer>
  );
};

const ImageUploaderContainer = styled('div')`
  display: flex;
  height: 35%;
  align-items: center;
  padding-left: 24px;
`;
export default GoodsImageUploader;