import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import theme from '@src/theme/theme';

interface Props {
  url: string;
}

const ReviewFormPreviewImage: React.FC<Props> = ({ url }) => {
  return (
    <ImageContainer>
      <ReviewImage src={url} />
      <ImageDeleteButtonContainer bgcolor={theme.primary}>
        <FaTimes fontSize='1.2em' color='#fff' />
      </ImageDeleteButtonContainer>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 28%;
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
`;

export default ReviewFormPreviewImage;
