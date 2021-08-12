import React, { useState } from 'react';
import styled from 'styled-components';
import ImageList from './ImageList/ImageList';
import MainImage from './Mainimage/MainImage';

interface Props {
  imgs: string[];
}

const GoodsImageSectionContainer = ({ imgs }: Props) => {
  const [active, setActive] = useState(0);
  return (
    <GoodsImageContainer>
      <ImageList imgs={imgs} active={active} setActive={setActive}></ImageList>
      <MainImage src={imgs[active]}></MainImage>
    </GoodsImageContainer>
  );
};

const GoodsImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  height: 100%;
`;

export default GoodsImageSectionContainer;
