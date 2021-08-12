import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DetailGoods } from '@src/types/Goods';
import { useParams } from '@src/lib/CustomRouter';
import GoodsInfo from './GoodsInfo/GoodsInfo';
import GoodsInteractive from './GoodsInteractive/GoodsInteractive';
import GoodsImageSection from './GoodsImageSection/GoodsImageSection';
import GoodsRelationList from '@src/pages/GoodsDetail/GoodsRelationList/GoodsRelationList';

const mockImagePath =
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg';

const TMP_IMAGES = [
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg',
  'https://user-images.githubusercontent.com/45394360/129191127-2853e5c1-bdb1-45a2-97b8-2fdb7eef24af.jpg',
  'https://user-images.githubusercontent.com/45394360/129191079-fd386e7b-063a-4f38-8cf5-1391dbeeac9f.png',
];

const mock_products: DetailGoods[] = [
  {
    id: 1,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠1',
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
  {
    id: 3,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠3',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
  {
    id: 4,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠4',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
  {
    id: 5,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠5',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
  {
    id: 6,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠6',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    imgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
  },
  {
    id: 7,
    thumbnailImg: mockImagePath,
    title: '맥쥬짠7',
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
  // TODO: 작업 후 주석 해제
  // const [goods, setGoods] = useState<DetailGoods | null>(null);

  // TODO: API 연동 후 삭제
  const [goods, setGoods] = useState<DetailGoods | null>({
    id: 1,
    title: '플리츠마마X배달의민족. 텀블러백',
    price: 49000,
    discountRate: 50,
    deliveryFee: 2500,
    deliveryDetail: '오후 2시 당일배송마감',
    isWished: false,
    imgs: TMP_IMAGES,
  });

  const { id } = useParams();
  useEffect(() => {
    // TODO: 작업 후 주석 해제
    // const idAsNumber = Number(id);

    // TODO: API 연동 후 삭제
    const idAsNumber = Number(3);

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
          {goods.imgs && <GoodsImageSection imgs={goods.imgs} />}
          <GoodsContentContainer>
            <GoodsInfo
              title={goods.title}
              price={goods.price}
              discountRate={goods.discountRate ?? 0}
              deliveryFee={goods.deliveryFee}
              deliveryDetail={goods.deliveryDetail}
              isWished={goods.isWished ?? false}
            ></GoodsInfo>
            <GoodsInteractive {...goods} />
          </GoodsContentContainer>
        </GoodsMainContainer>
      )}
      <GoodsRelationList goodsList={mock_products} />
    </GoodsDetailContainer>
  );
};

const GoodsDetailContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 5vh;
`;

const GoodsMainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vw;
  margin-bottom: 5vh;
  font-family: 'Noto Sans', sans-serif;
`;

const GoodsContentContainer = styled.div``;

export default GoodsDetailPage;
