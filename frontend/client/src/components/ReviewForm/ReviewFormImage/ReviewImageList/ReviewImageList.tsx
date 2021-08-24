import ReviewFormPreviewImage from '@src/components/ReviewForm/ReviewFormImage/ReviewImageList/ReviewFormPreviewImage/ReviewFormPreviewImage';
import React from 'react';
import styled from 'styled-components';

interface Props {
  previewImages: string[];
}

const ReviewImageList: React.FC<Props> = ({ previewImages }) => {
  return (
    <ReviewImagesContainer>
      {previewImages.map((url) => (
        <ReviewFormPreviewImage key={url} url={url} />
      ))}
    </ReviewImagesContainer>
  );
};

const ReviewImagesContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
  width: 80%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default ReviewImageList;
