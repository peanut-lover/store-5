import React from 'react';
import { styled } from '@src/lib/CustomStyledComponent';
import ProductUploadModal from '@src/portal/ProductUploadModal/ProductUploadModal';

const Main = () => {
  return (
    <MainContainer>
      <ProductUploadModal />
    </MainContainer>
  );
};

const MainContainer = styled('div')`
  width: 1200px;
`;

export default Main;
