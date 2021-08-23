import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageZoom, { ZoomImageReturnType } from './ZoomImage';

const MainImage: React.FC<{ src: string }> = ({ src }) => {
  let imageZoom: ZoomImageReturnType;
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;
    const { width, height } = container.getBoundingClientRect();
    imageZoom = ImageZoom(container, {
      width,
      src,
      height,
      scale: 1.8,
    }) as ZoomImageReturnType;
    return () => {
      imageZoom.kill();
    };
  }, [src]);

  return <MainImageContainer ref={containerRef} />;
};

const MainImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

export default MainImage;
