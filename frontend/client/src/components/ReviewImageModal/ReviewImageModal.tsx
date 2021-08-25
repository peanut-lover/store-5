import Portal from '@src/portal/portal';
import { Review } from '@src/types/Review';
import React from 'react';
import Dim from '../Dim/Dim';

interface Props {
  initialReview: Review;
  initialIndex: number;
  onClose?: () => void;
}

const ReviewImageModal: React.FC<Props> = ({ initialReview, initialIndex, onClose }) => {
  return (
    <Portal>
      <Dim onClick={onClose}></Dim>
    </Portal>
  );
};

export default ReviewImageModal;
