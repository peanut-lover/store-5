import Portal from '@src/portal/portal';
import { Review } from '@src/types/Review';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Dim from '../../Dim/Dim';

interface Props {
  initialReview: Review;
  initialIndex: number;
  onClose?: () => void;
}

const ReviewImageModal: React.FC<Props> = ({ initialReview, initialIndex, onClose }) => {
  const [review] = useState(initialReview);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialIndex,
  };

  return (
    <Portal>
      <Dim onClick={onClose}>
        <SliderWrapper>
          <StyledSlider {...sliderSettings}>
            {review.reviewImgs.map((reviewImg) => (
              <Image key={reviewImg.id} src={reviewImg.url} />
            ))}
          </StyledSlider>
        </SliderWrapper>
      </Dim>
    </Portal>
  );
};

const SliderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSlider = styled(Slider)`
  width: 50vmin;
  height: 50vmin;
`;

const Image = styled.img`
  object-fit: contain;
  background-color: black;
`;

export default ReviewImageModal;
