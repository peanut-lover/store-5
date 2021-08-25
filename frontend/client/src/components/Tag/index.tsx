import React from 'react';
import styled from 'styled-components';
import { FaLeaf } from '@react-icons/all-files/fa/FaLeaf';
import { FaThumbsUp } from '@react-icons/all-files/fa/FaThumbsUp';
import { FaRegLightbulb } from '@react-icons/all-files/fa/FaRegLightbulb';
import { FaDollarSign } from '@react-icons/all-files/fa/FaDollarSign';

export const GreenTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.naturalGreen}>
    GREEN <FaLeaf />
  </TagWrapper>
);

export const NewTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.splashBlue}>
    NEW <FaRegLightbulb />
  </TagWrapper>
);

// TODO: icon
export const BestTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalBlack}>
    BEST <FaThumbsUp />
  </TagWrapper>
);

export const SaleTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalRed}>
    SALE <FaDollarSign />
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
  align-items: center;
  border-radius: 0.4rem;
  padding: 0.2rem;
  color: ${(props) => props.fontColor ?? 'white'};
  background-color: ${(props) => props.bgColor ?? 'black'};
  font-size: 0.8rem;
  font-weight: 300;
  user-select: none;
`;
