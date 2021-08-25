import useUserState from '@src/hooks/useUserState';
import React, { useCallback } from 'react';
import { FaFlask } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
}
const SampleSignin: React.FC<Props> = ({ onClose }) => {
  const [userRecoil, userRecoilDispatch] = useUserState();
  const handleClickLogin = useCallback(
    async (e) => {
      await userRecoilDispatch({ type: 'SAMPLE_LOGIN' });
      onClose();
    },
    [userRecoilDispatch]
  );
  return (
    <SampleSigninContainer>
      <IconContainer onClick={handleClickLogin}>
        <FaFlask size='3em' color='#2AC1BC' />
        <Span>시연용으로 접속하기</Span>
      </IconContainer>
    </SampleSigninContainer>
  );
};
const SampleSigninContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 50%;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #2ac1bc;
  padding: 12px;
  margin: auto;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: RGBA(42, 195, 188, 0.19);
  }
`;

const Span = styled.span`
  color: #2ac1bc;
  font-size: 2em;
  margin-left: 12px;
`;

export default SampleSignin;
