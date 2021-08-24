import React from 'react';
import styled from 'styled-components';
import LoadingImg from '@src/assets/empty-kim.gif';

const ReviewLoading: React.FC = () => {
  return (
    <Wrapper>
      <Image src={LoadingImg} />
      <Text>리뷰를 불러오는 중입니다...</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 4rem 0;
`;

const Image = styled.img`
  width: 16rem;
  height: 16rem;
`;

const Text = styled.div`
  font-size: 1.25rem;
  color: ${(props) => props.theme.placeholder};
`;

export default ReviewLoading;
