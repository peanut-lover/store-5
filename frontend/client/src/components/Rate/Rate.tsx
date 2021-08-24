import React from 'react';
import styled from 'styled-components';
import Star from '../Star/Star';

interface RateProps {
  rate: number;
}

const MAX_RATE = 5;

const Rate: React.FC<RateProps> = ({ rate }) => {
  return (
    <Layout>
      {/* 이 사례에선 key에 index를 부여하는 것이 적절합니다. */}
      {Array.from({ length: MAX_RATE }).map((_, index) => (
        <Star key={index} isFilled={rate > index} />
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export default Rate;
