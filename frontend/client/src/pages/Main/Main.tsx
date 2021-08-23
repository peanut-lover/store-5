import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainGoodsListResult, ThumbnailGoods } from '@src/types/Goods';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import PromotionCarousel from '@src/components/PromotionCarousel/PromotionCarousel';
import { Promotion } from '@src/types/Promotion';
import Footer from '@src/components/Footer/Footer';
import SideBar from './SideBar/SideBar';
import { getMainGoodsListMap } from '@src/apis/goodsAPI';
import { getPromotions } from '@src/apis/promotionAPI';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/recoil/userState';

const mockProductImagePath =
  'https://user-images.githubusercontent.com/20085849/128866958-900ad32a-cd32-4b97-be79-1dbbc9dcb02d.jpeg';

const mock_best_products: ThumbnailGoods[] = [
  {
    id: 1,
    thumbnailUrl: mockProductImagePath,
    title: '맥쥬짠',
    price: 10000,
    isGreen: true,
    isBest: true,
    discountRate: 0,
  },
  { id: 2, thumbnailUrl: mockProductImagePath, title: '맥쥬짠', price: 10000, isNew: true, discountRate: 0 },
  { id: 3, title: 'NoImage 맥쥬짠', price: 10000, isSale: true, discountRate: 20 },
  { id: 4, thumbnailUrl: mockProductImagePath, title: '맥쥬짠', price: 10000, discountRate: 0 },
];

const Main = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const userRecoil = useRecoilValue(userState);

  const fetchPromotions = async () => {
    const { result } = await getPromotions();
    setPromotions(result);
  };

  const [mainGoodsListMap, setMainGoodsListMap] = useState<MainGoodsListResult | null>(null);

  const fetchMainGoodsListMap = async () => {
    const data = await getMainGoodsListMap();
    setMainGoodsListMap(data.result);
  };

  useEffect(() => {
    fetchPromotions();
    fetchMainGoodsListMap();
  }, [userRecoil]);

  return (
    mainGoodsListMap && (
      <>
        <PromotionContainer>
          <PromotionCarousel promotions={promotions} />
        </PromotionContainer>
        <MainContentContainer>
          <GoodsSection sectionTitle='잘나가요' goodsList={mainGoodsListMap.bestGoodsList} itemBoxSize='big' />
          <GoodsSection sectionTitle='새로 나왔어요' goodsList={mainGoodsListMap.discountGoodsList} itemBoxSize='big' />
          <GoodsSection sectionTitle='지금 할인 중' goodsList={mainGoodsListMap.latestGoodsList} itemBoxSize='big' />
        </MainContentContainer>
        <SideBar goodsList={mock_best_products} />
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </>
    )
  );
};

const PromotionContainer = styled.div`
  max-height: 300px;
  min-width: 1500px;
  overflow: hidden;
  animation: pageShowEffect 0.5s 0s;

  @keyframes pageShowEffect {
    from {
      opacity: 0;
      transform: translate(-100%, 0%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  min-width: 1280px;
  padding: 0 15% 0 15%;
`;

interface FooterContainerProps {
  theme: {
    dustWhite: string;
  };
}

const FooterContainer = styled.div<FooterContainerProps>`
  width: 100%;
  background-color: ${(props) => props.theme.dustWhite};
`;

export default Main;
