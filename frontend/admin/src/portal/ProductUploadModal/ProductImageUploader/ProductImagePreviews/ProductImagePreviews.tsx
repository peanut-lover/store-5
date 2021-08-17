import React from 'react';
import styled from 'styled-components';

interface Props {
  previewImages: string[];
}

const ProductImagePreviews: React.FC<Props> = ({ previewImages }) => {
  return (
    <div>
      <PreviewImage src={'http://localhost:8080/uploads/76bc7da57ee20405767487a84256b0f9'} />
      {previewImages.map((url, i) => (
        <PreviewImage key={i} src={url} />
      ))}
    </div>
  );
};

const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
`;

export default ProductImagePreviews;
