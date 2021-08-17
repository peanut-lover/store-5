import React, { useState } from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem/ImageItem';

interface Props {
  imgs: string[];
  active?: number;
  setActive?: React.Dispatch<React.SetStateAction<number>>;
}

const ImageList: React.FC<Props> = ({ imgs, active = 0, setActive = () => {} }) => {
  const imageItems = imgs.map((img, index) => (
    <ImageItem index={index} src={img} setActive={setActive} isActivated={active === index} key={'images ' + index} />
  ));
  return <ImageListContainer>{imageItems}</ImageListContainer>;
};

const ImageListContainer = styled.div`
  width: 5rem;
  display: grid;
  grid-gap: 0.25rem;
  align-self: baseline;
  max-height: 25rem;
  overflow-y: auto;
`;

export default ImageList;
