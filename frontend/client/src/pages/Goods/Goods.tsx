import React from 'react';
import styled from 'styled-components';
import ImageList from './ImageList/ImageList';
import MainImage from './Mainimage/MainImage';
import GoodsInfo from './GoodsInfo/GoodsInfo';
import GoodsPrice from './GoodsPrice/GoodsPrice';
import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import { Goods } from '@src/types/Goods';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg';

const TMP_IMAGES = Array(8)
  .fill('')
  .map((_) => 'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg');

const mock_products: Goods[] = [
  { id: 1, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isGreen: true, isBest: true },
  { id: 2, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 3, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true, isSale: true, discountRate: 20 },
  { id: 4, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
  { id: 5, thumbnailImg: mockImagePath, title: '맥쥬짠', price: 10000, isNew: true },
];

export interface GoodsProps {
  title: string;
  price: number;
  discountRate: number;
  deliveryFee: number;
  deliveryDetail: string;
  isWished: boolean;
}

const Goods = () => {
  const content = {
    title: '플리츠마마X배달의민족. 텀블러백',
    price: 49000,
    discountRate: 50,
    deliveryFee: 2500,
    deliveryDetail: '오후 2시 당일배송마감',
    isWished: false,
  };
  return (
    <GoodsContainer>
      <GoodsMainContainer>
        <ImageContainer>
          <ImageList images={TMP_IMAGES}></ImageList>
          <MainImage src={TMP_IMAGES[0]}></MainImage>
        </ImageContainer>
        <GoodsContentContainer>
          <GoodsInfo {...content}></GoodsInfo>
          <GoodsPrice title={content.title} price={content.price} deliveryFee={content.deliveryFee} />
          <GoodsButtons isWished={content.isWished} />
        </GoodsContentContainer>
      </GoodsMainContainer>
      <GoodsSection sectionTitle='연관상품' goodsList={mock_products} />
    </GoodsContainer>
  );
};

const GoodsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const GoodsMainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vw;
  font-family: 'Noto Sans', sans-serif;
  height: 30rem;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  height: 100%;
`;

const GoodsContentContainer = styled.div``;

export default Goods;
