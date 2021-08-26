import React from 'react';
import { FaRegHandPointLeft } from '@react-icons/all-files/fa/FaRegHandPointLeft';
import styled from 'styled-components';
import { theme } from '@src/theme/theme';

const BackIcon = () => {
  const handleClick = () => {
    location.href = '/';
  };
  return (
    <BackIconContainer onClick={handleClick}>
      <FaRegHandPointLeft color={theme.primary} size='2em' />
      <HeaderIconButton color={theme.primary}>쇼핑몰</HeaderIconButton>
    </BackIconContainer>
  );
};

const BackIconContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-top: 10rem;
  padding: 0 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
export const HeaderIconButton = styled.button<{ color: string }>`
  height: 100%;
  border: none;
  margin-left: 12px;
  background-color: transparent;
  color: ${(props) => props.color};
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
`;

export default BackIcon;
