import React from 'react';
import styled from 'styled-components';
import { FaLeaf, FaThumbsUp } from 'react-icons/fa';
import { AiFillAlert, AiFillDollarCircle } from 'react-icons/ai';

export const GreenTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.naturalGreen}>
    GREEN <FaLeaf />
  </TagWrapper>
);

export const NewTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.splashBlue}>
    NEW <AiFillAlert />
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
    SALE <AiFillDollarCircle />
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
