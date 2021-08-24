import React from 'react';
import Paginator from '../Paginator/Paginator';
import ReviewContainerHeader from '../ReviewContainerHeader/ReviewContainerHeader';
import ReviewList from '../ReviewList/ReviewList';

interface Props {}

// TODO: NoData, Loading
const ReviewContainer: React.FC<Props> = ({}) => {
  return (
    <>
      <ReviewContainerHeader />
      <ReviewList />
      <Paginator totalPage={3} currentPage={1} setPage={() => {}} />
    </>
  );
};

export default ReviewContainer;
