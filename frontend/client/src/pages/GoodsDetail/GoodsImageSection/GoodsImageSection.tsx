import React, { useState } from 'react';
import styled from 'styled-components';
import ImageList from './ImageList/ImageList';
import MainImage from './Mainimage/MainImage';

interface Props {
  imgs: string[];
}

const GoodsImageSection: React.FC<Props> = ({ imgs }) => {
  const [active, setActive] = useState(0);
  return (
    <GoodsImageContainer>
      <ImageList imgs={imgs} active={active} setActive={setActive} />
      <MainImage src={imgs[active]} />
    </GoodsImageContainer>
  );
};

const GoodsImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  height: 100%;
`;

export default GoodsImageSection;
