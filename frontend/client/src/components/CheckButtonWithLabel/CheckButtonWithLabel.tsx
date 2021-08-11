import React from 'react';
import styled from 'styled-components';
import CheckButton from '@src/components/CheckButton/CheckButton';

interface Props {
  value: boolean;
  onClick: () => void;
  label: string;
}

const CheckButtonWithLabel: React.FC<Props> = ({ value, onClick, label }) => {
  return (
    <Wrapper>
      <CheckButton value={value} onClick={onClick}></CheckButton>
      <Label onClick={onClick}>{label}</Label>
    </Wrapper>
  );
};

const Label = styled.label`
  cursor: pointer;
  padding-left: 0.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default CheckButtonWithLabel;
