import React from 'react';
import styled from 'styled-components';

interface Props {
  previewImages: string[];
}

const ProductImagePreviews: React.FC<Props> = ({ previewImages }) => {
  return (
    <div>
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
