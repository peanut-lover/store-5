import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Promotion } from '@src/types/Promotion';

interface Props {
  promotions: Promotion[];
}

const SLIDE_SETTING = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

// TODO:(jiho) Promotion 타입에 fetchURL이 있어야하지않을가? 항상 상품 상세화면으로 가야하나? 아니면 다른 화면으로 갈 수 있지않을까?
const PromotionCarousel: React.FC<Props> = ({ promotions }) => {
  return (
    <PromotionCarouselContainer>
      <Slider {...SLIDE_SETTING}>
        {promotions.map(({ id, imgUrl }) => (
          <PromotionImage key={id} src={imgUrl} />
        ))}
      </Slider>
    </PromotionCarouselContainer>
  );
};

const PromotionCarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const PromotionImage = styled.img`
  width: 100%;
  user-select: none;
  object-fit: contain;
  outline: none;
`;

export default PromotionCarousel;
