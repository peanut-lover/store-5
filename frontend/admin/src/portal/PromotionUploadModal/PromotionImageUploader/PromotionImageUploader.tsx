import { styled } from '@src/lib/CustomStyledComponent';
import PromotionImageButton from '@src/portal/PromotionUploadModal/PromotionImageUploader/PromotionImageButton/PromotionImageButton';
import PromotionPreviewImage from '@src/portal/PromotionUploadModal/PromotionImageUploader/PromotionPreviewImage/PromotionPreviewImage';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';

interface Props {
  onUploadFile: (f: File) => void;
}

const PromotionImageUploader: React.FC<Props> = ({ onUploadFile }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleClickToUplade = useCallback(() => {
    imageInputRef.current?.click();
  }, [imageInputRef.current]);
  const handleUploadImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || !files[0]) return;
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      onUploadFile(file);
    },
    [setPreviewImage, onUploadFile]
  );

  return (
    <ImageUploaderContainer onClick={handleClickToUplade}>
      {previewImage ? <PromotionPreviewImage url={previewImage} /> : <PromotionImageButton />}
      <input ref={imageInputRef} type='file' accept='image/*' hidden onChange={handleUploadImage} />
    </ImageUploaderContainer>
  );
};

const ImageUploaderContainer = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;
export default PromotionImageUploader;
