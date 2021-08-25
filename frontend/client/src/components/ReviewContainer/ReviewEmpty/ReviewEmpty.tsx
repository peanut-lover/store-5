import React from 'react';
import styled from 'styled-components';
import EmptyImg from '@src/assets/empty-kim.gif';

const ReviewEmpty: React.FC = () => {
  return (
    <Wrapper>
      <Image src={EmptyImg} />
      <Text>아직 해당 상품에 대한 리뷰가 없습니다.</Text>
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

export default ReviewEmpty;
