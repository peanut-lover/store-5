import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DetailGoods } from '@src/types/Goods';
import { useParams } from '@src/lib/CustomRouter/CustomRouter';
import GoodsInfo from './GoodsInfo/GoodsInfo';
import GoodsInteractive from './GoodsInteractive/GoodsInteractive';
import GoodsImageSection from './GoodsImageSection/GoodsImageSection';
import RelationSection from './RelationSection/RelationSection';
import { getGoodsDetail } from '@src/apis/goodsAPI';
import { usePushToast } from '@src/lib/ToastProvider/ToastProvider';
import useRecentGoodsHistory from '@src/hooks/useRecentGoodsHistory';

import theme from '@src/theme/theme';

const ERROR_SERVER = '서버 문제로 상품 정보 조회에 실패하였습니다!';

const GoodsDetailPage = () => {
  const [recentGoodsList, setRecentGoodsList] = useRecentGoodsHistory();
  const { id } = useParams();
  const pushToast = usePushToast();
  const [goods, setGoods] = useState<DetailGoods | null>(null);

  const fetchDetailGoods = async (goodsId: number) => {
    try {
      const data = await getGoodsDetail(goodsId);
      setGoods(data.result);
      setRecentGoodsList([data.result, ...recentGoodsList]);
    } catch (e) {
      console.error(e);
      setGoods(null);
      pushToast({ text: ERROR_SERVER, color: theme.error });
    }
  };

  useEffect(() => {
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      throw new Error('올바르지 않은 상품 id입니다.');
    }
    fetchDetailGoods(idAsNumber);
  }, [id]);

  console.log(goods);
  return (
    <GoodsDetailContainer>
      {goods && (
        <>
          <GoodsMainContainer>
            {goods.goodsImgs && <GoodsImageSection imgs={goods.goodsImgs} />}
            <GoodsContentContainer>
              <GoodsInfo goods={goods} />
              <GoodsInteractive goods={goods} />
            </GoodsContentContainer>
          </GoodsMainContainer>
          <RelationSection categoryName={goods.category.name} />
        </>
      )}
    </GoodsDetailContainer>
  );
};

const GoodsDetailContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 5vh;
  animation: goodsDetailContainerShowEffect 0.5s 0s;

  @keyframes goodsDetailContainerShowEffect {
    from {
      opacity: 0;
      transform: translate(100%, 0%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
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
