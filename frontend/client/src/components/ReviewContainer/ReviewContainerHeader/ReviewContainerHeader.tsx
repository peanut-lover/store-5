import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt } from '@react-icons/all-files/fa/FaPencilAlt';
import AwesomeButton from '../../AwesomeButton/AwesomeButton';

interface Props {
  lengthOfReviews: number;
}

const ReviewContainerHeader: React.FC<Props> = ({ lengthOfReviews }) => {
  return (
    <Wrapper>
      <Title>리뷰{lengthOfReviews > 0 && ` (${lengthOfReviews})`}</Title>
      <AwesomeButton>
        <ButtonInner>
          <FaPencilAlt />
          리뷰 작성하기
          <FaPencilAlt />
        </ButtonInner>
      </AwesomeButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
`;

const ButtonInner = styled.div`
  display: flex;
  gap: 1rem;
`;

export default ReviewContainerHeader;
