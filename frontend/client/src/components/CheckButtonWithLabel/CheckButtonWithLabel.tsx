import React from 'react';
import CheckButton from '@src/components/CheckButton/CheckButton';
import styled from 'styled-components';

const Label = styled.label`
  cursor: pointer;
  padding-left: 0.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

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

export default CheckButtonWithLabel;
