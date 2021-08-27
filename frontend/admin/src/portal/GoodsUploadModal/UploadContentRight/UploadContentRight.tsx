import { styled } from '@src/lib/CustomStyledComponent';
import GoodsCategoryUploader from './GoodsCategoryUploader/GoodsCategoryUploader';
import GoodsDeliveryUploader from './GoodsDeliveryUploader/GoodsDeliveryUploader';
import GoodsGreenUploader from './GoodsGreenUploader/GoodsGreenUploader';
import GoodsStateUploader from './GoodsStateUploader/GoodsStateUploader';
import React from 'react';
import { GoodsItem } from '@src/types/Goods';

interface Props {
  checkGreen: boolean;
  onHandleCheckGreen: () => void;
  onHandleDeliveryInfo: (id: number) => void;
  onHandleCategory: (id: number) => void;
  onHandleProductState: (productState: string) => void;
  goodsStates: string[];
  goods?: GoodsItem | null;
}

const UploadContentRight: React.FC<Props> = ({
  checkGreen,
  onHandleCheckGreen,
  onHandleCategory,
  onHandleDeliveryInfo,
  onHandleProductState,
  goodsStates,
  goods,
}) => {
  return (
    <>
      <ContentContainer>
        <GoodsCategoryUploader onHandleCategory={onHandleCategory} goodsId={goods?.id} />
      </ContentContainer>
      <ContentContainer>
        <GoodsStateUploader onHandleProductState={onHandleProductState} goodsStates={goodsStates} />
      </ContentContainer>
      <ContentContainer>
        <GoodsDeliveryUploader onHandleDeliveryInfo={onHandleDeliveryInfo} />
      </ContentContainer>
      <ContentContainer>
        <GoodsGreenUploader checkGreen={checkGreen} onHandleCheckGreen={onHandleCheckGreen} />
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 76px;
  margin-bottom: 24px;
`;

export default UploadContentRight;
