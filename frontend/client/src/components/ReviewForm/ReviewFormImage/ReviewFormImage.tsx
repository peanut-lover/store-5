import ReviewImageList from '@src/components/ReviewForm/ReviewFormImage/ReviewImageList/ReviewImageList';
import ReviewImageUploadButton from '@src/components/ReviewForm/ReviewFormImage/ReviewImageUploadButton/ReviewImageUploadButton';
import { ReviewImg } from '@src/types/Review';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onHandlePrevImage: (url: string) => void;
  onDeleteFile: (index: number) => void;
  onUpdateFiles: (newFiles: File[]) => void;
  prevImages?: ReviewImg[];
}

const ReviewFormImage: React.FC<Props> = ({ onHandlePrevImage, onUpdateFiles, onDeleteFile, prevImages }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [previewImages, setPreviewImages] = useState<string[]>(prevImages ? prevImages.map((img) => img.url) : []);

  const handleImageUpload = useCallback(() => {
    imageInputRef.current && imageInputRef.current.click();
  }, [imageInputRef.current]);

  const handleAddImages = useCallback(
    (e) => {
      const addFiles: File[] = [];
      const addImages: string[] = [];
      Array.prototype.forEach.call(e.target.files, (f: File) => {
        const imageUrl = URL.createObjectURL(f);
        addFiles.push(f);
        addImages.push(imageUrl);
      });
      onUpdateFiles(addFiles);
      setPreviewImages((prev) => [...prev, ...addImages]);
    },
    [setPreviewImages]
  );

  const handleDeleteImage = useCallback(
    (index: number) => {
      if (previewImages[index][0] !== 'b') onHandlePrevImage(previewImages[index]);
      setPreviewImages((prev) => prev.filter((url, i) => i !== index));
      onDeleteFile(index);
    },
    [previewImages, onDeleteFile, setPreviewImages, onHandlePrevImage]
  );

  return (
    <ReviewFormImageContainer>
      <ReviewImageUploadButton onClick={handleImageUpload} imagesLen={previewImages.length} />
      <ReviewImageList previewImages={previewImages} onDeleteImage={handleDeleteImage} />
      <input ref={imageInputRef} type='file' accept='.jpg, .png, .jpeg' hidden multiple onChange={handleAddImages} />
    </ReviewFormImageContainer>
  );
};

const ReviewFormImageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0 12px 36px;
  height: 20%;
  border-bottom: 1px solid lightgray;
`;
export default ReviewFormImage;
