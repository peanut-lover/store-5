import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Goods } from '@src/types/Goods';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import GoodsItem from '@src/components/GoodsItem/GoodsItem';

interface Props {
  goodsList: Goods[];
}

const GoodsRelationList = ({ goodsList }: Props) => {
  const settings = {
    speed: 300,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  const GoodsItems = goodsList.map((goods) => <GoodsItem key={goods.id} {...goods} />);
  return (
    <GoodsRelationListContainer>
      <div>
        <Title>연관상품</Title>
        <CustomSliderButtons>
          <LeftButton>
            <FaAngleLeft />
          </LeftButton>
          <RightButton>
            <FaAngleRight />
          </RightButton>
        </CustomSliderButtons>
      </div>
      <Slider {...settings}>{GoodsItems}</Slider>
    </GoodsRelationListContainer>
  );
};

const GoodsRelationListContainer = styled.div`
  .slick-track {
    * {
      width: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const Title = styled.h3`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
  display: inline-block;
`;

const CustomSliderButtons = styled.div``;

const LeftButton = styled.button``;

const RightButton = styled.button``;

export default GoodsRelationList;
