import ReviewFormContents from '@src/components/ReviewForm/ReviewFormContents/ReviewFormContents';
import ReviewFormFooter from '@src/components/ReviewForm/ReviewFormFooter/ReviewFormFooter';
import ReviewFormHeader from '@src/components/ReviewForm/ReviewFormHeader/ReviewFormHeader';
import ReviewFormImage from '@src/components/ReviewForm/ReviewFormImage/ReviewFormImage';
import React from 'react';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  // TODO: Content 내용 Type화
  prevContents?: string;
}

const ReviewForm: React.FC<Props> = ({ onClose, onSubmit, prevContents }) => {
  return (
    <ReviewFormContainer>
      <ReviewFormHeader />
      <ReviewFormImage />
      <ReviewFormContents />
      <ReviewFormFooter />
    </ReviewFormContainer>
  );
};

const ReviewFormContainer = styled.div``;

export default ReviewForm;
