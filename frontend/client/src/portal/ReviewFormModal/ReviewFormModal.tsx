import ReviewForm from '@src/components/ReviewForm/ReviewForm';
import Portal from '@src/portal/portal';
import { Review } from '@src/types/Review';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  prevContents?: Review;
}

const ReviewFormModal: React.FC<Props> = ({ goodsId, thumbnail, title, onClose, prevContents }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((e) => {
    const el = e.target;
    if (modalRef.current && modalRef.current.contains(el)) return;
    onClose();
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <Portal>
      <ReviewFormContainer>
        <ReviewFormContent ref={modalRef}>
          <ReviewForm
            goodsId={goodsId}
            thumbnail={thumbnail}
            title={title}
            onClose={onClose}
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
