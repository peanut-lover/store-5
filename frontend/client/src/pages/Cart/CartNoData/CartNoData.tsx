import React from 'react';
import styled from 'styled-components';

const CartNoData: React.FC = () => {
  return (
    <Wrapper>
      {/* TODO: import asset이 안되는 이유 찾기 */}
      <Img src='https://cdn-mart.baemin.com/front-end/assets/20210803103146/images/empty-cart.d6e30f3a9b6ce424c59b924c7fd86bd3.png' />
      <Title>장바구니에 담긴 상품이 없습니다.</Title>
      <Button>메인으로 가기</Button>
    </Wrapper>
  );
};

const Img = styled.img`
  height: 8rem;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  color: #666;
  font-size: 1.25rem;
  font-weight: normal;
`;

const Button = styled.button`
  cursor: pointer;
  border: 1px solid #ddd;
  color: black;
  background-color: white;
  margin: 0;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: bolder;

  transition: 0.2s linear;

  :hover {
    border: 1px solid black;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;
  margin-bottom: 4rem;
`;

export default CartNoData;
