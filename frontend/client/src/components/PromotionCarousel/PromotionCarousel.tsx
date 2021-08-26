import React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Promotion } from '@src/types/Promotion';
import { usePushHistory } from '@src/lib/CustomRouter';
import PromotionAPI from '@src/apis/promotionAPI';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';

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
  appendDots: (dots) => <CustomSlickDotContainer> {dots}</CustomSlickDotContainer>,
};

const PromotionCarousel: React.FC<Props> = ({ promotions }) => {
  const push = usePushHistory();
  const pushToast = usePushToast();
  const handleClickGoodsItem = (promotionId: number, goodsId: number) => {
    console.log('GOOD id : ' + goodsId);
    try {
      PromotionAPI.increasePromotionView(promotionId);
    } catch (err) {
      console.error('프로모션 조회를 하는데 오류가 발생했습니다.');
    }
    if (goodsId) {
      push('/detail/' + goodsId);
    } else {
      pushToast({ text: '관련된 상품이 없습니다.', positionRow: 'center', positionColumn: 'top' });
    }
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
  height: 350px;
  user-select: none;
  object-fit: contain;
  outline: none;
  cursor: pointer;
`;

/**
 * React Slick의 default dot container는 display: absolute가 적용되어있었습니다.
 * 하지만 저희 프로젝트에 적절히 사용하기 위해서 flex로 커스터마이징 했습니다.
 */
const CustomSlickDotContainer = styled.ul`
  /* display: flex;
  justify-content: center; */
  bottom: 1rem;
  & > li > button::before {
    font-size: 1rem;
  }
`;

export default PromotionCarousel;
