import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const CheckButton: React.FC<Props> = ({ isChecked, onClick }) => {
  return (
    <StyledButton isChecked={isChecked} onClick={onClick}>
      {isChecked && <FaCheck color='white' />}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isChecked: boolean }>`
  cursor: pointer;
  border-radius: 0.125rem;
  transition: 0.2s linear;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.isChecked ? 'rgb(42, 193, 188)' : 'white')};
  border: 1px solid ${(props) => (props.isChecked ? 'rgb(42, 193, 188)' : '#ddd')};
`;

export default CheckButton;
