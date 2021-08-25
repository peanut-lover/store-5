import ReviewAPI from '@src/apis/reviewAPI';
import { Review } from '@src/types/Review';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import Paginator from '../Paginator/Paginator';
import ReviewContainerHeader from './ReviewContainerHeader/ReviewContainerHeader';
import ReviewEmpty from './ReviewEmpty/ReviewEmpty';
import ReviewImageModal from './ReviewImageModal/ReviewImageModal';
import ReviewList from './ReviewList/ReviewList';
import ReviewLoading from './ReviewLoading/ReviewLoading';
import ReviewFormModal from '@src/portal/ReviewFormModal/ReviewFormModal';
import { DetailGoods } from '@src/types/Goods';

interface Props {
  initialGoods: DetailGoods;
  initialGoodsId: number;
}

interface ReviewImageModalState {
  initialReview?: Review;
  initialIndex?: number;
  isOpened: boolean;
}

const LIMIT_PER_PAGE = 3;
const SCROLL_MARGIN = 128;

const ReviewContainer: React.FC<Props> = ({ initialGoodsId, initialGoods }) => {
  const [goodsId] = useState(initialGoodsId);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review>();
  const [isFetched, setIsFetched] = useState(false);
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [reviewImageModalState, setReviewImageModalState] = useState<ReviewImageModalState>({ isOpened: false });
  const handleCloseReviewImageModal = () => {
    setReviewImageModalState({ isOpened: false });
  };

  const lastPromiseRef = useRef<Object | null>(null);
  const thisRef = useRef<null | HTMLDivElement>(null);

  const handlePaginatorSetPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPage) return;
      setCurrentPage(page);
      fetchReviews(page);
      const deltaScrollY = thisRef.current!.getBoundingClientRect().top - SCROLL_MARGIN;
      if (deltaScrollY < 0) window.scrollBy({ top: deltaScrollY, behavior: 'smooth' });
    },
    [totalPage]
  );

  const handleClickReviewImg = (reviewId: number, reviewImgId: number) => {
    const initialReview = reviews.find(({ id }) => id === reviewId)!;
    const initialIndex = initialReview.reviewImgs.findIndex(({ id }) => id === reviewImgId)!;
    setReviewImageModalState({ initialReview, initialIndex, isOpened: true });
  };
  const handleDeleteReview = (reviewId: number) => {};
  const handleUpdateReview = (review: Review) => {
    setOpenReviewForm(true);
    setSelectedReview(review);
  };
  const handleOpenReviewForm = useCallback(() => {
    setSelectedReview(undefined);
    setOpenReviewForm(true);
  }, []);
  const fetchReviews = useCallback(async (currentPage: number) => {
    const promise = ReviewAPI.getReviewsOfGoods(goodsId, LIMIT_PER_PAGE, currentPage);
    lastPromiseRef.current = promise;
    const { result } = await promise;
    if (lastPromiseRef.current !== promise) return;

    const { reviews } = result;
    const { totalCount } = result.meta;
    const totalPage = Math.floor((totalCount - 1) / LIMIT_PER_PAGE) + 1;

    setReviews(reviews);
    setTotalCount(totalCount);
    if (totalPage < currentPage) setCurrentPage(totalPage);
    setTotalPage(totalPage);
    setIsFetched(true);
  }, []);

  const handleCloseReviewForm = useCallback(() => {
    setOpenReviewForm(false);
  }, []);
  useEffect(() => {
    fetchReviews(currentPage);
  }, []);

  return (
    <Wrapper ref={thisRef}>
      <ReviewContainerHeader onOpenReviewForm={handleOpenReviewForm} lengthOfReviews={totalCount} />
      {!isFetched ? (
        <ReviewLoading />
      ) : reviews.length === 0 ? (
        <ReviewEmpty />
      ) : (
        <>
          <ReviewList
            reviews={reviews}
            onDeleteReview={handleDeleteReview}
            onUpdateReview={handleUpdateReview}
            onClickReviewImg={handleClickReviewImg}
          />
          {totalPage > 1 && (
            <Paginator totalPage={totalPage} currentPage={currentPage} setPage={handlePaginatorSetPage} />
          )}
          {reviewImageModalState.isOpened && (
            <ReviewImageModal
              initialReview={reviewImageModalState.initialReview!}
              initialIndex={reviewImageModalState.initialIndex!}
              onClose={handleCloseReviewImageModal}
            />
          )}
          {openReviewForm && (
            <ReviewFormModal
              goodsId={initialGoods.id}
              thumbnail={initialGoods.thumbnailUrl}
              title={initialGoods.title}
              onClose={handleCloseReviewForm}
              prevContents={selectedReview}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ReviewContainer;
