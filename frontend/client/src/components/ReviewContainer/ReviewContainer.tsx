import React from 'react';
import styled from 'styled-components';
import Paginator from '../Paginator/Paginator';
import ReviewContainerHeader from '../ReviewContainerHeader/ReviewContainerHeader';
import ReviewList from '../ReviewList/ReviewList';

interface Props {}

// TODO: NoData, Loading
const ReviewContainer: React.FC<Props> = ({}) => {
  return (
    <Wrapper>
      <ReviewContainerHeader />
      <ReviewList />
      <Paginator totalPage={3} currentPage={1} setPage={() => {}} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ReviewContainer;
