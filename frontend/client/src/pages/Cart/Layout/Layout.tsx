import React from 'react';
import styled from 'styled-components';

interface Props {
  pageHeader?: JSX.Element;
  contentLeft?: JSX.Element;
  contentRight?: JSX.Element;
}

const Layout: React.FC<Props> = ({ pageHeader, contentLeft, contentRight }) => {
  return (
    <Wrapper>
      {pageHeader}
      <ContentWrapper>
        <LayoutLeft>{contentLeft}</LayoutLeft>
        <LayoutRight>{contentRight}</LayoutRight>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: initial;
  font-size: initial;
  margin: 2rem auto;
  width: 1024px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
`;
const LayoutLeft = styled.div`
  flex: 6;
`;
const LayoutRight = styled.div`
  flex: 4;
`;

export default Layout;
