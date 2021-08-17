import React, { useCallback, useRef, useState } from 'react';
import ProductImagePreviews from './ProductImagePreviews/ProductImagePreviews';

interface Props {
  onHandleUpdateFiles: (newFiles: File[]) => void;
}

const ProductImageUploader: React.FC<Props> = ({ onHandleUpdateFiles }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(() => {
    imageInput.current && imageInput.current.click();
  }, [imageInput.current]);

  const handleChangeImages = useCallback(
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

  return (
    <div>
      <button onClick={handleImageUpload}>icon</button>
      <ProductImagePreviews previewImages={previewImages} />
      <input ref={imageInput} type='file' accept='.jpg, .png, .jpeg' hidden multiple onChange={handleChangeImages} />
    </div>
  );
};

export default ProductImageUploader;
