import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';
import Rate from '../Rate/Rate';
import AwesomeButton from '../AwesomeButton/AwesomeButton';
import { Review } from '@src/types/Review';
import { convertYYYYMMDD } from '@src/utils/dateHelper';

interface Props {
  review: Review;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const { id, user, rate, contents, reviewImgs, createdAt, isYours } = review;

  return (
    <Wrapper>
      <TopBox>
        <TopLeftBox>
          <Avatar />
          <NameAndRateBox>
            <NameText>{user.name}</NameText>
            <RateAndDateBox>
              <Rate rate={rate} />
              <DateText>{convertYYYYMMDD(new Date(createdAt))}</DateText>
            </RateAndDateBox>
          </NameAndRateBox>
        </TopLeftBox>
        {isYours && (
          <TopRightBox>
            <AwesomeButton>수정</AwesomeButton>
            <AwesomeButton>삭제</AwesomeButton>
          </TopRightBox>
        )}
      </TopBox>
      {reviewImgs.length > 0 && (
        <IamgesWrapper>
          {reviewImgs.map((reviewImg) => (
            <Image key={reviewImg.id} src={reviewImg.url} />
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
  gap: 0.25rem;
`;

const IamgesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Image = styled.img`
  object-fit: cover;
  width: 4rem;
  height: 4rem;
`;

const ReviewContents = styled.div`
  /* 개행문자를 인식하고 적용하는 css 프로퍼티입니다. */
  white-space: pre-wrap;
`;

export default ReviewCard;
