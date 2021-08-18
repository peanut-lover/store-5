import { createCart } from '@src/apis/cartAPI';
import { getGoodsDetail, getGoodsStockCount } from '@src/apis/goodsAPI';
import MainImage from '@src/pages/GoodsDetail/GoodsImageSection/Mainimage/MainImage';
import GoodsInfo from '@src/pages/GoodsDetail/GoodsInfo/GoodsInfo';
import GoodsAmount from '@src/pages/GoodsDetail/GoodsInteractive/GoodsAmount/GoodsAmount';
import GoodsInteractive from '@src/pages/GoodsDetail/GoodsInteractive/GoodsInteractive';
import { DetailGoods } from '@src/types/Goods';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  goodsId: number;
}

const CartForm: React.FC<Props> = ({ goodsId }) => {
  const [goods, setGoods] = useState<DetailGoods | null>(null);
  const [isOver, setIsOver] = useState(false);
  const [amount, setAmount] = useState(0);

  const fetchDetailGoods = async (goodsId: number) => {
    try {
      const data = await getGoodsDetail(goodsId);
      setGoods(data.result);
    } catch (e) {
      setGoods(null);
    }
  };

  const fetchCheckStock = async () => {
    try {
      const data = await getGoodsStockCount(goodsId);
      const stock = data.result;
      if (stock < amount) setIsOver(true);
      else setIsOver(false);
    } catch (e) {
      setIsOver(false);
    }
  };

  const addToCart = useCallback(async () => {
    if (isOver) {
      // 수량 초과 모달
    } else {
      // 장바구니 이동
      const result = await createCart({ goodsId, amount });
    }
  }, [amount]);

  useEffect(() => {
    fetchDetailGoods(goodsId);
  }, [goodsId]);

  useEffect(() => {
    fetchCheckStock();
  }, [amount]);

  if (!goods) return null;

  return (
    <CartFormContainer>
      <MainImage src={goods.thumbnailUrl ?? ''} />
      <GoodsContentContainer>
        <GoodsInfo goods={goods} />
        <GoodsAmount
          title={goods.title}
          price={goods.price}
          amount={amount}
          deliveryFee={goods?.deliveryFee ?? 0}
          discountRate={goods.discountRate}
          isOver={isOver}
          setAmount={setAmount}
        />
        <CartButton onClick={addToCart}>장바구니 담기</CartButton>
      </GoodsContentContainer>
    </CartFormContainer>
  );
};

const CartFormContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  overflow-y: auto;
`;

const GoodsContentContainer = styled.div``;

const CartButton = styled.div`
  text-align: center;
  width: 100%;
  height: 3rem;
  border: 1px solid #bbb;
  background-color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CartForm;
