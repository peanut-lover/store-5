import React from 'react';
import styled from 'styled-components';
import theme from '@src/theme/theme';

import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { FaRegStar } from '@react-icons/all-files/fa/FaRegStar';

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
      {value <= rate ? <FaStar fill={theme.primary} fontSize='1.8em' /> : <FaRegStar fontSize='1.8em' />}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

export default RateStar;
