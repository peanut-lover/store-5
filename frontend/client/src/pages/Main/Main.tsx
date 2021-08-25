import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainGoodsListResult } from '@src/types/Goods';
import GoodsSection from '@src/components/GoodsSection/GoodsSection';
import PromotionCarousel from '@src/components/PromotionCarousel/PromotionCarousel';
import { Promotion } from '@src/types/Promotion';
import { getMainGoodsListMap } from '@src/apis/goodsAPI';
import PromotionAPI from '@src/apis/promotionAPI';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/recoil/userState';
import AdminFubButton from '@src/components/AdminFubButton/AdminFubButton';

const Main = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const userRecoil = useRecoilValue(userState);

  const fetchPromotions = async () => {
    const { result } = await PromotionAPI.getPromotions();
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
        <AdminFubButton />
      </>
    )
  );
};

const PromotionContainer = styled.div`
  max-height: 300px;
  min-width: 1280px;

  overflow: hidden;
  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  min-width: 1280px;
  padding: 0 15% 0 15%;
`;

export default Main;
