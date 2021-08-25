import RollingNumber from '@src/components/RollingNumberMaker/RollingNumber/RollingNumber';
import React, { memo } from 'react';

interface Props {
  txt: string;
}
const RollingNumberMaker: React.FC<Props> = memo(({ txt }) => {
  return (
    <>
      {Array.from(`${txt}원`).map((str: string) => {
        // TODO: key를 랜덤하게 줄 수 있는 방법 최적화가 필요함!
        return <RollingNumber key={Math.random() * 100 * Math.random() * Math.random()} txt={str} />;
      })}
    </>
  );
});

export default RollingNumberMaker;
