import React from 'react';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
import { useTheme } from 'styled-components';

interface StarProps {
  isFilled?: boolean;
}

const Star: React.FC<StarProps> = ({ isFilled }) => {
  const theme = useTheme() as any;
  /*
  아 이거 난처하네요...
  useTheme가 styled-components에서 제공하는 훅인데 반환값의 타입이 빈 객체라서 프로퍼티 접근을 타입스크립트가 막아버리네요...
  흠...
  */

  return <FaStar color={isFilled ? theme.primary : theme.placeholder} />;
};

export default Star;
