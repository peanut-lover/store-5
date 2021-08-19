import { styled } from '@src/lib/CustomStyledComponent';
import React, { useCallback, useRef, useState } from 'react';

interface Props {
  onUploadFile: (f: File) => void;
}

const PromotionImageUploader: React.FC<Props> = ({ onUploadFile }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleUploadImage = useCallback(() => {}, []);
  return (
    <ImageUploaderContainer>
      <input ref={imageInputRef} type='file' accept='image/*' hidden onChange={handleUploadImage} />
    </ImageUploaderContainer>
  );
};

const ImageUploaderContainer = styled('div')``;
export default PromotionImageUploader;
