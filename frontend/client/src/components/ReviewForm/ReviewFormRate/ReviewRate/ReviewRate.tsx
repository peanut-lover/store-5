import RateStar from '@src/components/ReviewForm/ReviewFormRate/ReviewRate/RateStar/RateStar';
import React, { useState } from 'react';
import styled from 'styled-components';

const STARS = [1, 2, 3, 4, 5];

interface Props {
  rate: number;
  onHandleRate: (rate: number) => void;
}

const ReviewRate: React.FC<Props> = ({ rate, onHandleRate }) => {
  return (
    <RateContainer>
      {STARS.map((value, i) => (
        <RateStar key={i} value={value} rate={rate} onHandleRate={onHandleRate} />
      ))}
    </RateContainer>
  );
};

const RateContainer = styled.div`
  display: flex;
`;

export default ReviewRate;
