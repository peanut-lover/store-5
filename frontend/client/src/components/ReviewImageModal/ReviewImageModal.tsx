import Portal from '@src/portal/portal';
import { Review } from '@src/types/Review';
import React from 'react';
import styled from 'styled-components';

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

const Dim = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #00000020;
`;

export default ReviewImageModal;
