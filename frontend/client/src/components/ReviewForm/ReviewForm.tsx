import ReviewFormContents from '@src/components/ReviewForm/ReviewFormContents/ReviewFormContents';
import ReviewFormFooter from '@src/components/ReviewForm/ReviewFormFooter/ReviewFormFooter';
import ReviewFormHeader from '@src/components/ReviewForm/ReviewFormHeader/ReviewFormHeader';
import ReviewFormImage from '@src/components/ReviewForm/ReviewFormImage/ReviewFormImage';
import ReviewFormRate from '@src/components/ReviewForm/ReviewFormRate/ReviewFormRate';
import React from 'react';
import styled from 'styled-components';

interface Props {
  goodsId: number;
  thumbnail?: string;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  // TODO: Content 내용 Type화
  prevContents?: string;
}

const ReviewForm: React.FC<Props> = ({ thumbnail, goodsId, title, onClose, onSubmit, prevContents }) => {
  return (
    <ReviewFormContainer>
      <ReviewFormHeader onClose={onClose} />
      <ReviewFormRate thumbnail={thumbnail} title={title} />
      <ReviewFormImage />
      <ReviewFormContents />
      <ReviewFormFooter />
    </ReviewFormContainer>
  );
};

const ReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ReviewForm;
