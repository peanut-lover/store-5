import React from 'react';
import theme from '@src/theme/theme';
import styled from 'styled-components';

interface Props {
  flagLabel: string;
  flagText: string;
  active: boolean;
  setSearchFlag: (flag: string) => void;
}

const CategoryFlag: React.FC<Props> = ({ flagLabel, flagText, active, setSearchFlag }) => {
  return (
    <CategoryFlagContainer>
      <CategoryFlagButton active={active} onClick={() => setSearchFlag(flagLabel)}>
        {flagText}
      </CategoryFlagButton>
    </CategoryFlagContainer>
  );
};

const CategoryFlagContainer = styled.div``;

const CategoryFlagButton = styled.button<{ active: boolean }>`
  opacity: 0.8;
  transition: opacity 0.15s linear;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Do Hyeon', sans-serif;
  color: ${(props) => (props.active ? theme.primary : 'black')};
  :hover {
    opacity: 1;
  }
`;

export default CategoryFlag;
