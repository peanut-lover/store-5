import theme from '@src/theme/theme';
import React from 'react';
import styled from 'styled-components';

const ReviewFormFooter = () => {
  return (
    <ReviewFormFooterContainer>
      <CloseButton>닫기</CloseButton>
      <SubmitButton>작성</SubmitButton>
    </ReviewFormFooterContainer>
  );
};

const ReviewFormFooterContainer = styled.div`
  display: flex;
  padding: 0 36px 12px 36px;
  width: 100%;
  height: 12%;
`;

const CloseButton = styled.button`
  width: 30%;
  height: 65%;
  margin-right: 20%;
  background-color: transparent;
  border-radius: 12px;
  font-size: 1.5em;
  border: 1px solid lightgray;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 50%;
  height: 65%;
  background-color: transparent;
  border-radius: 12px;
  font-size: 1.5em;
  border: 1px solid lightgray;
  cursor: pointer;
`;

export default ReviewFormFooter;
