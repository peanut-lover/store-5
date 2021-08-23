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
import { userState } from '@src/recoil/userState';
import { useRecoilValue } from 'recoil';

const ERROR_SERVER = '서버 문제로 상품 정보 조회에 실패하였습니다!';

const GoodsDetailPage = () => {
  const [recentGoodsList, setRecentGoodsList] = useRecentGoodsHistory();
  const { id } = useParams();
  const { isLoggedIn } = useRecoilValue(userState);
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

  return (
    <GoodsDetailContainer>
      {goods && (
        <>
          <GoodsMainContainer>
            {goods.goodsImgs && <GoodsImageSection imgs={goods.goodsImgs} />}
            <GoodsContentContainer>
              <GoodsInfo goods={goods} />
              <GoodsInteractive goods={goods} />
              {!isLoggedIn && (
                <RequireLoginContainer>
                  <small>찜하기, 장바구니, 구매는 로그인이 필요합니다!</small>
                </RequireLoginContainer>
              )}
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

const RequireLoginContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 0.5rem;
  font-size: 11px;
  color: #999;
`;

const GoodsContentContainer = styled.div``;

export default GoodsDetailPage;
