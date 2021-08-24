import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';
import Rate from '../Rate/Rate';
import TempImg from '@src/assets/empty-img.png';
import AwesomeButton from '../AwesomeButton/AwesomeButton';

interface Props {}

const ReviewCard: React.FC<Props> = ({}) => {
  // props: id, userName, rate, createAt, 상품 정보, 이미지 리스트, 리뷰 내용

  return (
    <Wrapper>
      <TopBox>
        <TopLeftBox>
          <Avatar />
          <NameAndRateBox>
            <NameText>사용자명</NameText>
            <RateAndDateBox>
              <Rate rate={3} />
              <DateText>2020.12.12.</DateText>
            </RateAndDateBox>
          </NameAndRateBox>
        </TopLeftBox>
        {/* 자기 것이면 렌더링한다! */}
        <TopRightBox>
          <AwesomeButton>수정</AwesomeButton>
          <AwesomeButton disabled>삭제</AwesomeButton>
        </TopRightBox>
      </TopBox>
      <GoodsInfoText>상품 정보</GoodsInfoText>
      {/* 이미지가 있다면 렌더링한다! */}
      <IamgesWrapper>
        <Image src={TempImg} />
        <Image src={TempImg} />
        <Image src={TempImg} />
      </IamgesWrapper>
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

const GoodsInfoText = styled.div`
  color: ${(props) => props.theme.label};
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
