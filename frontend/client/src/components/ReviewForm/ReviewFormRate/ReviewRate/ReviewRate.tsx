import RateStar from '@src/components/ReviewForm/ReviewFormRate/ReviewRate/RateStar/RateStar';
import React, { useState } from 'react';
import styled from 'styled-components';

const STARS = [1, 2, 3, 4, 5];

const ReviewRate = () => {
  const [rate, setRate] = useState<number>(3);
  return (
    <RateContainer>
      {STARS.map((value, i) => (
        <RateStar key={i} value={value} rate={rate} />
      ))}
    </RateContainer>
  );
};

const RateContainer = styled.div`
  display: flex;
`;

export default ReviewRate;
