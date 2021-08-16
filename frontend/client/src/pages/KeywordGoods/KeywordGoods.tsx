import { useParams } from '@src/lib/CustomRouter';
import React from 'react';

const KeywordGoods = () => {
  // TODO: query를 받을 수 있도록 라우터를 수정했을 때 쿼리로 변경하기
  const { keyword } = useParams();
  return (
    <div>
      <h1>{`"${keyword}"`}</h1>
      <div>구현 중입니다. </div>
    </div>
  );
};

export default KeywordGoods;
