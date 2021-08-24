import React from 'react';
import styled from 'styled-components';
import { BsStar, BsStarFill } from 'react-icons/bs';
import theme from '@src/theme/theme';
interface Props {
  value: number;
  rate: number;
  onHandleRate: (rate: number) => void;
}

const RateStar: React.FC<Props> = ({ value, rate, onHandleRate }) => {
  return (
    <StarContainer
      onClick={() => {
        onHandleRate(value);
      }}
    >
      {value <= rate ? <BsStarFill fill={theme.primary} fontSize='1.8em' /> : <BsStar fontSize='1.8em' />}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

export default RateStar;
