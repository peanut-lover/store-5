import React from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem/ImageItem';

const ImageList = ({ images }: { images: string[] }) => {
  const active = 0;
  const imageItems = images.map((image, index) => (
    <ImageItem src={image} active={active === index} key={'images ' + index} />
  ));
  return <ImageListContainer>{imageItems}</ImageListContainer>;
};

const ImageListContainer = styled.div`
  width: 3rem;
  display: grid;
  grid-gap: 0.25rem;
`;

export default ImageList;
