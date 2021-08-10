import React from 'react';
import styled from 'styled-components';

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
  border-radius: 8px;
  padding: 5px;
  color: ${(props) => props.fontColor ?? 'white'};
  background-color: ${(props) => props.bgColor ?? 'black'};
  font-size: 16px;
  font-weight: 500;
`;

export const GreenTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.naturalGreen}>
    GREEN
  </TagWrapper>
);

export const NewTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.splashBlue}>
    NEW
  </TagWrapper>
);

// TODO: icon
export const BestTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalBlack}>
    BEST
  </TagWrapper>
);

export const SaleTag: React.FC = () => (
  <TagWrapper fontColor={tagColors.white} bgColor={tagColors.originalRed}>
    SALE
  </TagWrapper>
);
