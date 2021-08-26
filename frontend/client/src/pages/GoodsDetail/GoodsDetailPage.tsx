import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DetailGoods } from '@src/types/Goods';
import { useParams, usePushHistory } from '@src/lib/CustomRouter/CustomRouter';
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
import useScrollToTop from '@src/hooks/useScrollToTop';
import Loading from '@src/components/Loading/Loading';
import ReviewContainer from '@src/components/ReviewContainer/ReviewContainer';
import Divider from '@src/components/Divider/Divider';

const ERROR_SERVER = '서버 문제로 상품 정보 조회에 실패하였습니다!';

const DELAY_TIME = 100;
const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const GoodsDetailPage = () => {
  const [recentGoodsList, setRecentGoodsList] = useRecentGoodsHistory();
  const { id } = useParams();
  const { isLoggedIn } = useRecoilValue(userState);
  const [goods, setGoods] = useScrollToTop<DetailGoods | null>(null);
  const pushHistory = usePushHistory();
  const pushToast = usePushToast();

  const fetchDetailGoods = async (goodsId: number) => {
    try {
      const data = await getGoodsDetail(goodsId);
      await delay(DELAY_TIME);
      setGoods(data.result);
      setRecentGoodsList([data.result, ...recentGoodsList]);
    } catch (e) {
      console.error(e);
      pushToast({ text: ERROR_SERVER, color: theme.error });
    }
  };

  useEffect(() => {
    setGoods(null);
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) {
      pushToast({ text: '존재하지 않는 상품입니다.', positionRow: 'center', positionColumn: 'top' });
      pushHistory('/'); // Main 화면으로 강제 이동.
    } else {
      fetchDetailGoods(idAsNumber);
    }
  }, [id]);

  return (
    <GoodsDetailContainer>
      {goods ? (
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
          <GoodsDetailBottomInfoContainer>
            <RelationSection goodsId={goods.id} categoryName={goods.category.name} />
            <Divider />
            <ReviewContainer key={goods.id} initialGoodsId={goods.id} initialGoods={goods} />
          </GoodsDetailBottomInfoContainer>
        </>
      ) : (
        <Loading />
      )}
    </GoodsDetailContainer>
  );
};

const GoodsDetailContainer = styled.div`
  width: 100%;
  min-width: 1280px;
  padding: 0 15% 0 15%;
  min-height: 70vh;
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

const GoodsDetailBottomInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
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
  color: #b2b2b2;
`;

const GoodsContentContainer = styled.div``;

export default GoodsDetailPage;
