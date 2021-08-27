import Dim from '@src/components/Dim/Dim';
import ReviewForm from '@src/components/ReviewForm/ReviewForm';

import Portal from '@src/portal/portal';

import { Review } from '@src/types/Review';

import React from 'react';

import styled from 'styled-components';

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  prevContents?: Review;
}

const ReviewFormModal: React.FC<Props> = ({ goodsId, thumbnail, title, onClose, prevContents }) => {
  return (
    <Portal>
      <Dim onClick={onClose}>
        <ReviewFormContent>
          <ReviewForm
            goodsId={goodsId}
            thumbnail={thumbnail}
            title={title}
            onClose={onClose}
            prevContents={prevContents}
          />
        </ReviewFormContent>
      </Dim>
    </Portal>
  );
};

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
