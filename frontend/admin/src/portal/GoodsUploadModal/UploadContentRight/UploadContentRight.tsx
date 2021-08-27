import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import GoodsCategoryUploader from './GoodsCategoryUploader/GoodsCategoryUploader';
import GoodsDeliveryUploader from './GoodsDeliveryUploader/GoodsDeliveryUploader';
import GoodsGreenUploader from './GoodsGreenUploader/GoodsGreenUploader';
import GoodsStateUploader from './GoodsStateUploader/GoodsStateUploader';
import convertGoodsState from '@src/utils/convertGoodsState';
import { GoodsItem } from '@src/types/Goods';

interface Props {
  checkGreen: boolean;
  onHandleCheckGreen: () => void;
  onHandleDeliveryInfo: (id: number) => void;
  onHandleCategory: (id: number) => void;
  onHandleGoodsState: (goodsState: string) => void;
  goodsStates: string[];
  goods?: GoodsItem | null;
  selectedGoodsState: string;
}

const UploadContentRight: React.FC<Props> = ({
  checkGreen,
  onHandleCheckGreen,
  onHandleCategory,
  onHandleDeliveryInfo,
  onHandleGoodsState,
  goodsStates,
  goods,
  selectedGoodsState,
}) => {
  return (
    <>
      <ContentContainer>
        <GoodsCategoryUploader onHandleCategory={onHandleCategory} goodsId={goods?.id} />
      </ContentContainer>
      <ContentContainer>
        <GoodsStateUploader
          onHandleGoodsState={onHandleGoodsState}
          goodsStates={goodsStates}
          selectedGoodsState={selectedGoodsState}
        />
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
