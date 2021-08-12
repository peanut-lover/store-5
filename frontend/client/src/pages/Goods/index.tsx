import React, { useState } from 'react';
import styled from 'styled-components';
import ImageList from './ImageList/ImageList';
import MainImage from './Mainimage/MainImage';
import GoodsInfo from './GoodsInfo/GoodsInfo';
import GoodsPrice from './GoodsPrice/GoodsPrice';
import GoodsButtons from './GoodsButtons/GoodsButtons';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import { DetailGoods } from '@src/types/Goods';
import { useEffect } from 'react';
import { useParams } from '@src/lib/CustomRouter';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg';

const TMP_IMAGES = Array(8)
  .fill('')
  .map((_) => 'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg');

const mock_products: DetailGoods[] = [
  {
    id: 1,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
  {
    id: 2,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠2',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
];

const GoodsDetailPage = () => {
  const [goods, setGoods] = useState<DetailGoods | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      throw new Error('올바르지 않은 상품 id입니다.');
    }

    // TODO: change realapi
    const content: DetailGoods = {
      id: idAsNumber,
      title: '플리츠마마X배달의민족. 텀블러백',
      price: 49000,
      discountRate: 50,
      deliveryFee: 2500,
      deliveryDetail: '오후 2시 당일배송마감',
      isWished: false,
      imgs: TMP_IMAGES,
    };
    setGoods(content);
  }, []);

  return (
    <GoodsDetailContainer>
      {/* TODO: more components */}
      {goods && (
        <GoodsMainContainer>
          <ImageContainer>
            <ImageList images={goods.imgs ?? []}></ImageList>
            {goods.imgs && <MainImage src={goods.imgs[0]}></MainImage>}
          </ImageContainer>

          <GoodsContentContainer>
            <GoodsInfo
              title={goods.title}
              price={goods.price}
              discountRate={goods.discountRate ?? 0}
              deliveryFee={goods.deliveryFee}
              deliveryDetail={goods.deliveryDetail}
              isWished={goods.isWished ?? false}
            ></GoodsInfo>
            <GoodsPrice title={goods.title} price={goods.price} deliveryFee={goods.deliveryFee} />
            <GoodsButtons isWished={goods.isWished ?? false} />
          </GoodsContentContainer>
        </GoodsMainContainer>
      )}

      <GoodsSection sectionTitle='연관상품' goodsList={mock_products} />
    </GoodsDetailContainer>
  );
};

const GoodsDetailContainer = styled.div`
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

const GoodsContentContainer = styled.div``;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  height: 100%;
`;

export default GoodsDetailPage;
