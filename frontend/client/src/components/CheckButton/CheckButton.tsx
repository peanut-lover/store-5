import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.125rem;
  transition: 0.2s linear;

  background-color: ${(props) => (props.value ? 'rgb(42, 193, 188)' : 'white')};
  border: 1px solid ${(props) => (props.value ? 'rgb(42, 193, 188)' : '#ddd')};
`;

interface Props {
  value: boolean;
  onClick: () => void;
}

const CheckButton: React.FC<Props> = ({ value, onClick }) => {
  return <StyledButton value={value ? 'true' : ''} onClick={onClick}></StyledButton>;
};

export default CheckButton;
