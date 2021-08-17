import React from 'react';
import ProductUploadModal from '../portal/ProductUploadModal/ProductUploadModal';
import { styled } from '@src/lib/CustomStyledComponent';

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
