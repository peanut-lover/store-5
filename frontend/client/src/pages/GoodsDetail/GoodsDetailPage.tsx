import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DetailGoods } from '@src/types/Goods';
import { useParams } from '@src/lib/CustomRouter/CustomRouter';
import GoodsInfo from './GoodsInfo/GoodsInfo';
import GoodsInteractive from './GoodsInteractive/GoodsInteractive';
import GoodsImageSection from './GoodsImageSection/GoodsImageSection';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import { getGoodsDetail } from '@src/apis/goodsAPI';

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
    thumbnailUrl: mockImagePath,
    title: '맥쥬짠1',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    goodsImgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
    discountRate: 0,
  },
  {
    id: 2,
    thumbnailUrl: mockImagePath,
    title: '맥쥬짠2',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    goodsImgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
    discountRate: 0,
  },
  {
    id: 3,
    thumbnailUrl: mockImagePath,
    title: '맥쥬짠3',
    price: 10000,
    isNew: true,
    isGreen: true,
    isBest: true,
    goodsImgs: TMP_IMAGES,
    deliveryDetail: '',
    deliveryFee: 0,
    discountRate: 0,
  },
];

const RelationSectionTitle = '연관 검색어';

const GoodsDetailPage = () => {
  const [goods, setGoods] = useState<DetailGoods | null>(null);
  const { id } = useParams();

  const fetchGoodsDetail = async (goodsId: number) => {
    try {
      const data = await getGoodsDetail(goodsId);
      console.log(data);
      setGoods(data.result);
    } catch (e) {
      setGoods(null);
    }
  };

  useEffect(() => {
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      throw new Error('올바르지 않은 상품 id입니다.');
    }
    fetchGoodsDetail(idAsNumber);
  }, []);

  return (
    <GoodsDetailContainer>
      {goods && (
        <GoodsMainContainer>
          {goods.goodsImgs && <GoodsImageSection imgs={goods.goodsImgs} />}
          <GoodsContentContainer>
            <GoodsInfo goods={goods}></GoodsInfo>
            <GoodsInteractive goods={goods} />
          </GoodsContentContainer>
        </GoodsMainContainer>
      )}
      <GoodsSection sectionTitle={RelationSectionTitle} goodsList={mock_products}></GoodsSection>
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
