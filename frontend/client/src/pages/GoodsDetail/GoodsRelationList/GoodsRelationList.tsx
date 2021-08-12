import React, { useCallback } from 'react';
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
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  const GoodsItems = goodsList.map((goods) => <GoodsItem key={goods.id} {...goods} />);
  const handleSlickSlider = useCallback((direction: string) => {
    const button = document.querySelector(`.slick-${direction}`) as HTMLButtonElement;
    button.click();
  }, []);
  return (
    <GoodsRelationListContainer>
      <FlexContainer>
        <Title>연관상품</Title>
        {goodsList.length > 5 && (
          <CustomSliderButtons>
            <LeftButton onClick={() => handleSlickSlider('next')}>
              <FaAngleLeft />
            </LeftButton>
            <RightButton onClick={() => handleSlickSlider('prev')}>
              <FaAngleRight />
            </RightButton>
          </CustomSliderButtons>
        )}
      </FlexContainer>
      <Slider {...settings}>{GoodsItems}</Slider>
    </GoodsRelationListContainer>
  );
};

const GoodsRelationListContainer = styled.div`
  .slick-track {
    * {
      width: auto;
      height: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 26px;
  font-weight: 600;
  margin-right: 26px;
`;

const CustomSliderButtons = styled.div`
  display: inline-flex;
`;

const LeftButton = styled.button`
  background-color: #fff;
  width: 32px;
  height: 32px;
  font-size: 20px;
  padding: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const RightButton = styled.button`
  background-color: #fff;
  width: 32px;
  height: 32px;
  font-size: 20px;
  padding: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

export default GoodsRelationList;
