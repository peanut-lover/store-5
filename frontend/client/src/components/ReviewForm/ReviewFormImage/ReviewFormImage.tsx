import ReviewImageList from '@src/components/ReviewForm/ReviewFormImage/ReviewImageList/ReviewImageList';
import ReviewImageUploadButton from '@src/components/ReviewForm/ReviewFormImage/ReviewImageUploadButton/ReviewImageUploadButton';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onDeleteFile: (index: number) => void;
  onUpdateFiles: (newFiles: File[]) => void;
}

const ReviewFormImage: React.FC<Props> = ({ onUpdateFiles, onDeleteFile }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

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
      setPreviewImages((prev) => prev.filter((url, i) => i !== index));
      onDeleteFile(index);
    },
    [onDeleteFile, setPreviewImages]
  );

  return (
    <ReviewFormImageContainer>
      <ReviewImageUploadButton onClick={handleImageUpload} />
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
