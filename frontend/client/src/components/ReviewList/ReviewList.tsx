import { Review } from '@src/types/Review';
import React from 'react';
import styled from 'styled-components';
import ReviewCard from '../ReviewCard/ReviewCard';

interface Props {
  reviews: Review[];
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <Wrapper>
      {reviews.map((review) => (
        <ReviewListItemWrapper key={review.id}>
          <ReviewCard review={review} />
        </ReviewListItemWrapper>
      ))}
    </Wrapper>
  );
};

// 시멘틱 html tag를 준수하였습니다.
const Wrapper = styled.ul``;

const ReviewListItemWrapper = styled.li`
  padding: 2rem 0rem 3rem 0rem;
  border-bottom: 1px dashed ${(props) => props.theme.placeholder};
`;

export default ReviewList;
