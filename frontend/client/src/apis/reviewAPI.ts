import { Review } from '@src/types/Review';
import { APIResponse, checkedFetch } from '@src/apis/base';

const CREATE_ERROR = '리뷰 생성에 실패했습니다.';

interface ReviewsOfGoodsResult {
  reviews: Review[];
  meta: {
    totalCount: number;
  };
}

async function getReviewsOfGoods(
  goodsId: number,
  limit: number,
  page: number
): Promise<APIResponse<ReviewsOfGoodsResult>> {
  const res = await checkedFetch(`/api/review?goodsId=${goodsId}&limit=${limit}&page=${page}`);
  return res.json();
}

async function createReview(formData: FormData) {
  const res = await fetch(`/api/review`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  if (res.ok) return res.json();

  const failed = await res.json();
  throw Error(failed.message || CREATE_ERROR);
}

async function updateReview(reviewId: number, formData: FormData) {
  const res = await checkedFetch(`/api/review/${reviewId}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });
  return res.json();
}

async function deleteReview(reviewId: number) {
  await checkedFetch(`/api/review/${reviewId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

const ReviewAPI = {
  getReviewsOfGoods,
  createReview,
  updateReview,
  deleteReview,
};

export default ReviewAPI;
