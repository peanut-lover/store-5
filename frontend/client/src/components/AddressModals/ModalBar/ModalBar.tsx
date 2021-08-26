import React from 'react';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import styled from 'styled-components';

interface Props {
  title: string;
  onClickExit?: () => void;
  disabled?: boolean;
}

const ModalBar: React.FC<Props> = ({ title, onClickExit, disabled }) => {
  return (
    <Wrapper>
      <FlexCenter>{title}</FlexCenter>
      <FlexRight>
        <IconButton disabled={disabled} onClick={onClickExit}>
          <FaTimes size='1.5rem' />
        </IconButton>
      </FlexRight>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bolder;
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;

  ::before {
    content: '';
    flex: 1;
  }
`;

const FlexCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FlexRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  :disabled {
    cursor: initial;
  }
`;

export default ModalBar;
