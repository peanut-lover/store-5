import ReviewForm from '@src/components/ReviewForm/ReviewForm';
import Portal from '@src/portal/portal';
import { ReviewContent } from '@src/types/Review';
import React from 'react';
import styled from 'styled-components';

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  prevContents?: ReviewContent;
}
// , prevContents
const ReviewFormModal: React.FC<Props> = ({ goodsId, thumbnail, title, onClose, onSubmit }) => {
  const prevContents = {
    rate: 4,
    contents: '이전 prev',
    images: [
      {
        id: 1,
        url: 'https://user-images.githubusercontent.com/45394360/129675533-4623cae5-461c-4f9a-91bd-1ffd13e0d952.jpg',
      },
      {
        id: 2,
        url: 'https://user-images.githubusercontent.com/45394360/129676355-15c47cee-5afe-4f17-9a0d-2ebb932a8b46.jpg',
      },
    ],
  };
  return (
    <Portal>
      <ReviewFormContainer>
        <ReviewFormContent>
          <ReviewForm
            goodsId={goodsId}
            thumbnail={thumbnail}
            title={title}
            onClose={onClose}
            onSubmit={onSubmit}
            prevContents={prevContents}
          />
        </ReviewFormContent>
      </ReviewFormContainer>
    </Portal>
  );
};

const ReviewFormContainer = styled.div`
  position: fixed;
  z-index: 1000;
  text-align: center;
  background-color: #00000020;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ReviewFormContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  min-width: 700px;
  height: 80%;
  margin: auto;
  background-color: white;
  border-radius: 12px;
`;

export default ReviewFormModal;
