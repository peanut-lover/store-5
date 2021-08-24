import React from 'react';
import styled from 'styled-components';

interface Props {}

const ReviewContainerHeader: React.FC<Props> = ({}) => {
  const lengthOfReviews = 4;

  return (
    <Wrapper>
      <Title>리뷰{lengthOfReviews > 0 && ` (${lengthOfReviews})`}</Title>
      <button>리뷰 작성하기</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 2rem;
`;

export default ReviewContainerHeader;
