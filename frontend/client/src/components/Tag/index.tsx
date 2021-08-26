import React from 'react';
import styled from 'styled-components';
import { FaLeaf } from '@react-icons/all-files/fa/FaLeaf';
import { FaThumbsUp } from '@react-icons/all-files/fa/FaThumbsUp';
import { FaRegLightbulb } from '@react-icons/all-files/fa/FaRegLightbulb';
import { FaDollarSign } from '@react-icons/all-files/fa/FaDollarSign';

export const GreenTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.naturalGreen}>
    <span>GREEN</span>
    <FaLeaf />
  </TagWrapper>
);

export const NewTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.splashBlue}>
    <span>NEW</span>
    <FaRegLightbulb />
  </TagWrapper>
);

// TODO: icon
export const BestTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalBlack}>
    <span>BEST</span>
    <FaThumbsUp />
  </TagWrapper>
);

export const SaleTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalRed}>
    <span>SALE</span>
    <FaDollarSign />
  </TagWrapper>
);

const tagColors = {
  naturalGreen: '#81B622',
  originalBlack: '#000000',
  originalRed: '#F51720',
  splashBlue: '#189AB4',
  white: '#ffffff',
};

interface TagWrapperProps {
  fontColor: string;
  bgColor: string;
}

const TagWrapper = styled.div<TagWrapperProps>`
  display: flex;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  column-gap: 0.25rem;
  align-items: center;
  height: 1.5rem;
  color: ${(props) => props.fontColor ?? 'white'};
  background-color: ${(props) => props.bgColor ?? 'black'};
  font-size: 14px;
  font-weight: 300;
  user-select: none;
`;
