import React, { useCallback, useRef, useState } from 'react';

interface Props {
  onHandleUpdateFiles: (newFiles: File[] | File) => void;
}

const ProductImageUploader: React.FC<Props> = ({ onHandleUpdateFiles }) => {
  const [previewImages, setPreviewImages] = useState<String[]>([]);

  const imageInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(() => {
    imageInput.current && imageInput.current.click();
  }, [imageInput.current]);

  const handleChangeImages = useCallback(
    (e) => {
      const addFiles: File[] = [];
      const addImages: String[] = [];
      Array.prototype.forEach.call(e.target.files, (f: File) => {
        const imageUrl = URL.createObjectURL(f);
        addFiles.push(f);
        addImages.push(imageUrl);
      }); //
      onHandleUpdateFiles(addFiles);
      setPreviewImages((prev) => [...prev, ...addImages]);
    },
    [onHandleUpdateFiles, setPreviewImages]
  );

  return (
    <div>
      <button onClick={handleImageUpload}>icon</button>
      <input type='file' name='image' multiple hidden ref={imageInput} onChange={handleChangeImages} />
    </div>
  );
};

export default ProductImageUploader;
