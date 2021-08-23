import React, { useCallback } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Promotion } from '@src/types/Promotion';
import { usePushHistory } from '@src/lib/CustomRouter';
import PromotionAPI from '@src/apis/promotionAPI';
import PromotionCarouselImage from '@src/components/PromotionCarousel/PromotionCarouselImage/PromotionCarouselImage';

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
  const push = usePushHistory();
  const handleClickGoodsItem = (promotionId: number) => {
    PromotionAPI.increasePromotionView(promotionId);
    push('/detail/' + promotionId);
  };

  return (
    <PromotionCarouselContainer>
      <Slider {...SLIDE_SETTING}>
        {promotions.map(({ id, imgUrl }) => (
          <PromotionImage key={id} src={imgUrl} data-id={id} onClick={() => handleClickGoodsItem(id)} />
        ))}
      </Slider>
    </PromotionCarouselContainer>
  );
};

const PromotionCarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  /* 
    slick 슬라이더의 마지막 슬라이드가 상단에 위치하여 마지막 슬라이드만 onClick이 발생하는 문제가 있었습니다!
    하여 활성화된 슬라이더의 z-index를 1로 설정하였습니다.
  */
  .slick-active {
    z-index: 1;
  }
`;

const PromotionImage = styled.img`
  width: 100%;
  user-select: none;
  object-fit: contain;
  outline: none;
  cursor: pointer;
`;

export default PromotionCarousel;
