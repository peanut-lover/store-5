import React from 'react';
import styled from 'styled-components';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

interface Props {
  onClose: () => void;
}

const ReviewFormHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <HeaderContainer>
      <EmptyBox />
      <HeaderTitle>리뷰</HeaderTitle>
      <FaTimes cursor='pointer' onClick={onClose} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4em;
  width: 100%;
  height: 8%;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const EmptyBox = styled.div`
  width: 1em;
`;

const HeaderTitle = styled.span``;

export default ReviewFormHeader;
