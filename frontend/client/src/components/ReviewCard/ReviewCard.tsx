import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';
import Rate from '../Rate/Rate';

interface Props {}

const ReviewCard: React.FC<Props> = ({}) => {
  // props: id, userName, rate, createAt, 상품 정보, 이미지 리스트, 리뷰 내용

  return (
    <Wrapper>
      <TopBox>
        <TopLeftBox>
          <Avatar />
          <NameAndRateBox>
            <div>사용자명</div>
            <RateAndDateBox>
              <Rate rate={3} />
              <div>2020.12.12.</div>
            </RateAndDateBox>
          </NameAndRateBox>
        </TopLeftBox>
        <TopRightBox>
          <button>수정</button>
          <button>삭제</button>
        </TopRightBox>
      </TopBox>
      <div>상품 정보</div>
      <div>이미지 리스트</div>
      <ReviewContents>리뷰 내용</ReviewContents>
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

const RateAndDateBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TopRightBox = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ReviewContents = styled.div`
  /* 개행문자를 인식하고 적용하는 css 프로퍼티입니다. */
  white-space: pre-wrap;
`;

export default ReviewCard;
