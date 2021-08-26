import React from 'react';
import styled from 'styled-components';
import theme from '@src/theme/theme';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';

interface Props {
  url: string;
  index: number;
  onDeleteImage: (index: number) => void;
}

const ReviewFormPreviewImage: React.FC<Props> = ({ url, onDeleteImage, index }) => {
  return (
    <ImageContainer>
      <ReviewImage src={url} />
      <ImageDeleteButtonContainer onClick={() => onDeleteImage(index)} bgcolor={theme.primary}>
        <FaTimes fontSize='1.2em' color='#fff' />
      </ImageDeleteButtonContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 26%;
  height: 80%;
  min-height: 80%;
  min-width: 30%;
  margin-right: 24px;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`;

const ImageDeleteButtonContainer = styled.div<{ bgcolor: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -0.6em;
  right: -0.6em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;
`;

export default ReviewFormPreviewImage;
