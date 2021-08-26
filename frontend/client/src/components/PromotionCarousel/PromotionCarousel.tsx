import React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Promotion } from '@src/types/Promotion';
import { usePushHistory } from '@src/lib/CustomRouter';
import PromotionAPI from '@src/apis/promotionAPI';

interface Props {
  promotions: Promotion[];
}

const SLIDE_SETTING: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

const PromotionCarousel: React.FC<Props> = ({ promotions }) => {
  const push = usePushHistory();
  const handleClickGoodsItem = (promotionId: number, goodsId: number) => {
    PromotionAPI.increasePromotionView(promotionId);
    push('/detail/' + goodsId);
  };

  return (
    <PromotionCarouselContainer>
      <Slider {...SLIDE_SETTING}>
        {promotions.map(({ id, imgUrl, goodsId }) => (
          <PromotionImage key={id} src={imgUrl} data-id={id} onClick={() => handleClickGoodsItem(id, goodsId)} />
        ))}
      </Slider>
    </PromotionCarouselContainer>
  );
};

const PromotionCarouselContainer = styled.div`
  display: relative;
  width: 100%;
  height: 350px;
  /* 
    slick 슬라이더의 마지막 슬라이드가 상단에 위치하여 마지막 슬라이드만 onClick이 발생하는 문제가 있었습니다!
    하여 활성화된 슬라이더의 z-index를 1로 설정하였습니다.
  */
  .slick-active {
    z-index: 1;
  }
`;

const PromotionImage = styled.img`
  width: 100vw;
  height: 300px;
  user-select: none;
  object-fit: cover;
  outline: none;
  cursor: pointer;
`;

export default PromotionCarousel;
