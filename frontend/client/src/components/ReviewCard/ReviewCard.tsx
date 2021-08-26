import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';
import Rate from '../Rate/Rate';
import AwesomeButton from '../AwesomeButton/AwesomeButton';
import { Review } from '@src/types/Review';
import { convertYYYYMMDD } from '@src/utils/dateHelper';

interface Props {
  review: Review;
  onDeleteReview?: (reviewId: number) => void;
  onUpdateReview?: (review: Review) => void;
  onClickReviewImg?: (reviewId: number, reviewImgId: number) => void;
}

const ReviewCard: React.FC<Props> = ({ review, onDeleteReview, onUpdateReview, onClickReviewImg }) => {
  const { id, user, rate, contents, reviewImgs, createdAt, isMine } = review;

  return (
    <Wrapper>
      <TopBox>
        <TopLeftBox>
          <Avatar imgUrl={user.profileImgUrl} />
          <NameAndRateBox>
            <NameText>{user.name}</NameText>
            <RateAndDateBox>
              <Rate rate={rate} />
              <DateText>{convertYYYYMMDD(new Date(createdAt))}</DateText>
            </RateAndDateBox>
          </NameAndRateBox>
        </TopLeftBox>
        {isMine && (
          <TopRightBox>
            <AwesomeButton
              onClick={() => {
                onUpdateReview?.(review);
              }}
            >
              수정
            </AwesomeButton>
            <AwesomeButton
              onClick={() => {
                onDeleteReview?.(id);
              }}
            >
              삭제
            </AwesomeButton>
          </TopRightBox>
        )}
      </TopBox>
      {reviewImgs.length > 0 && (
        <IamgesWrapper>
          {reviewImgs.map((reviewImg) => (
            <li key={reviewImg.id}>
              <Image
                src={reviewImg.url}
                onClick={() => {
                  onClickReviewImg?.(id, reviewImg.id);
                }}
                hover={!!onClickReviewImg}
              />
            </li>
          ))}
        </IamgesWrapper>
      )}
      <ReviewContents>{contents}</ReviewContents>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopLeftBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 2.5rem;
`;

const NameAndRateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NameText = styled.div`
  font-size: 1rem;
`;

const RateAndDateBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateText = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.label};
`;

const TopRightBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IamgesWrapper = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const Image = styled.img<{ hover?: boolean }>`
  object-fit: cover;
  width: 4rem;
  height: 4rem;

  border: 1px solid ${({ theme }) => theme.line};
  transition: 0.2s;

  cursor: ${({ hover }) => (hover ? 'pointer' : 'initial')};
  :hover {
    border: 1px solid ${({ hover, theme }) => (hover ? theme.primary : theme.line)};
  }
`;

const ReviewContents = styled.div`
  /* 개행문자를 인식하고 적용하는 css 프로퍼티입니다. */
  white-space: pre-wrap;
`;

export default ReviewCard;
