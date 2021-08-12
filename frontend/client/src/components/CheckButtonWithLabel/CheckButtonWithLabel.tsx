import React from 'react';
import styled from 'styled-components';
import CheckButton from '@src/components/CheckButton/CheckButton';

interface Props {
  isChecked: boolean;
  onClick: () => void;
  label: string;
  isCircle?: boolean;
}

const CheckButtonWithLabel: React.FC<Props> = ({ isChecked, onClick, label, isCircle }) => {
  return (
    <Wrapper>
      <CheckButton isChecked={isChecked} onClick={onClick} isCircle={isCircle}></CheckButton>
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
