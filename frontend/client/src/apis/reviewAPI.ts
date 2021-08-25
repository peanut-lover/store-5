import { Review } from '@src/types/Review';

const mock: Review[] = [];

for (let i = 0; i < 12; i++) {
  mock.push({
    id: i,
    user: {
      id: 2,
      name: '홍길동',
      profileImgUrl: null,
    },
    rate: 3,
    contents: '좋아요 강추합니다\n맛있어요',
    reviewImgs: [
      {
        id: 1,
        url: '',
      },
      {
        id: 2,
        url: '',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isYours: i % 4 === 1,
  });
}

interface ReviewsOfGoodsResult {
  result: {
    reviews: Review[];
    meta: {
      totalCount: number;
    };
  };
}

function getReviewsOfGoods(goodsId: number, limit: number, page: number): Promise<ReviewsOfGoodsResult> {
  const reviews = mock.slice(limit * (page - 1), limit * page);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ result: { reviews, meta: { totalCount: mock.length } } });
    }, 1000);
  });
}

const ReviewAPI = { getReviewsOfGoods };

export default ReviewAPI;
