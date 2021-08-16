import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaCircle } from 'react-icons/fa';

interface Props {
  isChecked: boolean;
  onClick: () => void;
  isCircle?: boolean;
  disabled?: boolean;
}

const CheckButton: React.FC<Props> = ({ isChecked, onClick, isCircle, disabled }) => {
  return (
    <StyledButton isChecked={isChecked} onClick={onClick} isCircle={isCircle} disabled={disabled}>
      {isChecked && (isCircle ? <FaCircle color='white' size={'0.5rem'} /> : <FaCheck color='white' />)}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isChecked: boolean; isCircle?: boolean }>`
  cursor: pointer;
  border-radius: ${(props) => (props.isCircle ? '100%' : '0.125rem')};
  transition: 0.2s linear;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.isChecked ? 'rgb(42, 193, 188)' : 'white')};
  border: 1px solid ${(props) => (props.isChecked ? 'rgb(42, 193, 188)' : '#ddd')};

  :disabled {
    background-color: #eee;
    border: 1px solid #eee;

    :hover {
      cursor: initial;
    }
  }
`;

export default CheckButton;
