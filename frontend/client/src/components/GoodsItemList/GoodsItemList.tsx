import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import GoodsItem, { GoodsItemSize } from '@src/components/GoodsItem/GoodsItem';
import { Goods } from '@src/types/Goods';
import CartModal from '@src/portal/CartModal/CartModal';

interface Props {
  goodsList: Goods[];
  itemBoxSize?: GoodsItemSize;
}

const GoodsItemList: React.FC<Props> = ({ goodsList, itemBoxSize = 'big' }) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openGoodsId, setOpenGoodsModal] = useState<number | null>(null);

  const handleCloseCartModal = useCallback(() => {
    setOpenCartModal(false);
  }, []);

  const handleClickCart = useCallback((goodsId: number) => {
    setOpenCartModal(true);
    setOpenGoodsModal(goodsId);
  }, []);

  return (
    <GoodsItemListContainer>
      {goodsList &&
        goodsList.map((goods) => (
          <GoodsItem
            key={goods.id}
            id={goods.id}
            thumbnailUrl={goods.thumbnailUrl}
            title={goods.title}
            price={goods.price}
            isWish={goods.isWish}
            isBest={goods.isBest}
            isGreen={goods.isGreen}
            isNew={goods.isNew}
            isSale={goods.discountRate > 0}
            discountRate={goods.discountRate}
            itemBoxSize={itemBoxSize}
            handleClickCart={handleClickCart}
          />
        ))}
      {openCartModal && <CartModal goodsId={openGoodsId} onClose={handleCloseCartModal} />}
    </GoodsItemListContainer>
  );
};

const GoodsItemListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default GoodsItemList;
