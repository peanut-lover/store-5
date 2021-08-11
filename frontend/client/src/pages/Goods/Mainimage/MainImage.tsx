import React, { useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface ZoomProps {
  x: number;
  y: number;
}

const MainImage: React.FC<{ src: string }> = ({ src }) => {
  const [zoomState, setZoomState] = useState({
    active: false,
    x: 0,
    y: 0,
  });
  const onMouseEnter = useCallback((e) => {
    setZoomState({ ...zoomState, active: true });
  }, []);
  const onMouseMove = useCallback((e) => {
    const { layerX, layerY } = e.nativeEvent;
    const [x, y] = getZoomPosition(layerX, layerY);
    setZoomState({ ...zoomState, active: true, x, y });
  }, []);
  const onMouseLeave = useCallback((e) => {
    e.preventDefault();
    setZoomState({ ...zoomState, active: false });
  }, []);

  const getZoomPosition = (x: number, y: number) => {
    // console.log(pointerRef.current?.getBoundingClientRect());
    // console.log(containerRef.current?.getBoundingClientRect());
    const { width: containerX, height: containerY } = containerRef.current?.getBoundingClientRect() as DOMRect;
    const { width: pointerX, height: pointerY } = pointerRef.current?.getBoundingClientRect() as DOMRect;
    x -= pointerX / 2;
    y -= pointerY / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (pointerX + x > containerX) x = containerX - pointerX;
    if (pointerY + y > containerY) y = containerY - pointerY;
    return [x, y];
  };

  console.log('rerender');
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  return (
    <MainImageContainer
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img src={src} />
      {/* {zoomState.active && ( */}
      <ZoomPointer ref={pointerRef} x={zoomState.x} y={zoomState.y} />
      <ZoomWindow>
        <ZoomImage src={src} x={zoomState.x} y={zoomState.y} />
      </ZoomWindow>
      {/* )} */}
    </MainImageContainer>
  );
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

const ZoomPointer = styled.div<ZoomProps>`
  top: 0;
  position: absolute;
  width: 33%;
  height: 150px;
  border: 1px solid #999;
  transform: translate3d(${(props) => `${props.x}px, ${props.y}px, 0px`});
`;

const ZoomWindow = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  left: 100%;
  margin-left: 10%;
  position: absolute;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e0e0e0;
`;

const ZoomImage = styled.img<ZoomProps>`
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: -20%;
  left: -5%;
  width: 180%;
  height: 180%;
  transform: translate3d(${(props) => `-${props.x}px, -${props.y}px, 0px`});
`;

export default MainImage;
