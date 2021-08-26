import ReviewRate from '@src/components/ReviewForm/ReviewFormRate/ReviewRate/ReviewRate';
import React from 'react';
import styled from 'styled-components';
interface Props {
  thumbnail?: string;
  title: string;
  rate: number;
  onHandleRate: (rate: number) => void;
}
const ReviewFormRate: React.FC<Props> = ({ rate, thumbnail, title, onHandleRate }) => {
  return (
    <ReviewFormRateContainer>
      <GoodsImage src={thumbnail} />
      <GoodsTitle>{title}</GoodsTitle>
      <ReviewRate rate={rate} onHandleRate={onHandleRate} />
    </ReviewFormRateContainer>
  );
};

const ReviewFormRateContainer = styled.div`
  display: flex;
  align-items: center;
  height: 15%;
  border-bottom: 1px solid lightgray;
  padding: 12px 36px;
`;

const GoodsImage = styled.img`
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  margin-right: 16px;
`;

const GoodsTitle = styled.span`
  font-size: 1.3em;
  margin-right: 32px;
`;

export default ReviewFormRate;
