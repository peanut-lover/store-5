import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageZoom, { ZoomImageReturnType } from './ZoomImage';

const MainImage: React.FC<{ src: string }> = ({ src }) => {
  let imageZoom: ZoomImageReturnType;
  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const { width, height } = container.getBoundingClientRect();
    imageZoom = new (ImageZoom as any)(container, {
      width,
      src,
      height,
      scale: 1.8,
    }) as ZoomImageReturnType;
    return () => {
      imageZoom.kill();
    };
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  return <MainImageContainer ref={containerRef} />;
};

const MainImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export default MainImage;
