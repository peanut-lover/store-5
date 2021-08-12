/*
Library 원본 출처

  https://github.com/malaman/js-image-zoom

License

  MIT License

  Copyright (c) 2017 Andrii Malaman

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

export interface ZoomImageReturnType {
  setup: () => void;
  kill: () => void;
}

interface ImageZoomProps {
  src: string;
  width: number;
  height: number;
  scale: number;
  zoomWidth?: number;
}

interface ZoomData {
  sourceImg: {
    element: HTMLImageElement | null;
    width: number;
    height: number;
  };
  zoomedImgOffset: {
    vertical: number;
    horizontal: number;
  };
  zoomedImg: {
    element: HTMLElement | null;
    width: number;
    height: number;
  };
  zoomLens: {
    element: HTMLElement | null;
    width: number;
    height: number;
  };
}

export default function ImageZoom(
  this: any,
  container: HTMLDivElement,
  { width, src, height, zoomWidth = width / 2, scale = 1.5 }: ImageZoomProps
): ZoomImageReturnType | undefined {
  if (!container) {
    return;
  }
  const data: ZoomData = {
    // 이미지 태그
    sourceImg: {
      // 이미지 태그 엘리먼트
      element: null,
      // 이미지 태그 엘리먼트의 너비, 높이
      width: 0,
      height: 0,
    },
    // 확대된 이미지가 표시할 영역
    zoomedImgOffset: {
      vertical: 0,
      horizontal: 0,
    },
    // 줌 이미지 태그 엘리먼트
    zoomedImg: {
      // 줌 이미지 태그 엘리먼트
      element: null,
      // 줌 이미지 태그 엘리먼트의 너비, 높이
      width: 0,
      height: 0,
    },
    // 줌 렌즈 태그 엘리먼트 (이미지의 사각형 박스)
    zoomLens: {
      // 줌 렌즈 태그 엘리먼트
      element: null,
      // 줌 렌즈 태그 엘리먼트의 너비, 높이
      width: 0,
      height: 0,
    },
  };

  // 확대된 이미지가 들어갈 div 엘리먼트
  const div = document.createElement('div');

  // 확대 영역을 표시할 줌 렌즈 엘리먼트
  const lensDiv = document.createElement('div');

  // 좌측 이동 범위 한계 값
  function leftLimit(min: number): number {
    return width - min;
  }

  // 상단 이동 범위 한계 값
  function topLimit(min: number): number {
    return height - min;
  }

  // 줌렌즈의 좌측, 상단 값을 계산
  function getPosition(val: number, min: number, max: number) {
    const axisValue = val < min ? min : val > max ? max : val;
    return axisValue - min;
  }

  // 줌렌즈의 좌측 포지션을 반환
  function zoomLensLeft(left: number) {
    const leftMin = data.zoomLens.width / 2;
    return getPosition(left, leftMin, leftLimit(leftMin));
  }

  // 줌렌즈의 상단 포지션을 반환
  function zoomLensTop(top: number) {
    const topMin = data.zoomLens.height / 2;
    return getPosition(top, topMin, topLimit(topMin));
  }

  // 이미지의 확대 배율을 설정
  function setZoomedImgSize({ width, height }: { width: number; height: number }, data: ZoomData) {
    if (data?.zoomedImg?.element === null) return;
    data.zoomedImg.element.style.width = '100%';
    data.zoomedImg.element.style.height = '100%';
  }

  // 생성한 이미지 엘리먼트의 boundingClientRect를 반환
  function getOffset(el: HTMLElement) {
    if (el) {
      var elRect = el.getBoundingClientRect();
      return { left: elRect.left, top: elRect.top };
    }
    return { left: 0, top: 0 };
  }

  // 이미지 태그가 생성되었다면 zoomImg를 생성
  function onSourceImgLoad() {
    if (data.sourceImg.element === null || data.zoomedImg.element === null) return;

    setZoomedImgSize({ width, height }, data);

    data.sourceImg.width = data.sourceImg.element.width;
    data.sourceImg.height = data.sourceImg.element.height;
    data.zoomedImg.element.style.backgroundSize =
      data.sourceImg.element.width * scale + 'px ' + data.sourceImg.element.height * scale + 'px';

    data.zoomLens.width = width / scale;
    data.zoomLens.height = height / scale;

    if (data.zoomLens.element) {
      data.zoomLens.element.style.position = 'absolute';
      data.zoomLens.element.style.width = data.zoomLens.width + 'px';
      data.zoomLens.element.style.height = data.zoomLens.height + 'px';
      data.zoomLens.element.style.cssText += ' border: 1px solid #999';
      // data.zoomLens.element.pointerEvents = 'none';
    }
  }

  function setup() {
    // 소스이미지 생성
    const imageTag = document.createElement('img');
    imageTag.src = src;
    data.sourceImg.element = container.appendChild(imageTag);
    data.sourceImg.element.style.maxHeight = '100%';

    container.style.position = 'relative';
    data.sourceImg.element.style.width = width + 'px';
    data.sourceImg.element.style.height = height + 'px';

    data.zoomLens.element = container.appendChild(lensDiv);
    data.zoomLens.element.style.display = 'none';
    data.zoomLens.element.classList.add('js-image-zoom__zoomed-area');

    data.zoomedImg.element = container.appendChild(div);
    data.zoomedImg.element.classList.add('js-image-zoom__zoomed-image');
    data.zoomedImg.element.style.backgroundImage = "url('" + data.sourceImg.element.src + "')";
    data.zoomedImg.element.style.backgroundRepeat = 'no-repeat';
    data.zoomedImg.element.style.display = 'none';

    data.zoomedImg.element.style.position = 'absolute';
    data.zoomedImg.element.style.top = data.zoomedImgOffset.vertical + 'px';
    data.zoomedImg.element.style.right = data.zoomedImgOffset.horizontal - data.zoomedImgOffset.horizontal * 2 + 'px';
    data.zoomedImg.element.style.transform = 'translateX(100%)';

    // setup event listeners
    container.addEventListener('mousemove', events, false);
    container.addEventListener('mouseenter', events, false);
    container.addEventListener('mouseleave', events, false);
    data.zoomLens.element.addEventListener('mouseenter', events, false);
    data.zoomLens.element.addEventListener('mouseleave', events, false);
    window.addEventListener('scroll', events, false);

    return data;
  }

  function kill() {
    // 생성한 이벤트 삭제
    container.removeEventListener('mousemove', events, false);
    container.removeEventListener('mouseenter', events, false);
    container.removeEventListener('mouseleave', events, false);
    data.zoomLens.element?.removeEventListener('mouseenter', events, false);
    data.zoomLens.element?.removeEventListener('mouseleave', events, false);
    window.removeEventListener('scroll', events, false);

    // 생성한 DOM 삭제
    data.zoomLens.element && container.removeChild(data.zoomLens.element);
    data.zoomedImg.element && container.removeChild(data.zoomedImg.element);
    data.sourceImg.element && container.removeChild(data.sourceImg.element);

    return data;
  }

  const events = {
    handleEvent: function (event: MouseEvent) {
      switch (event.type) {
        case 'mousemove':
          return this.handleMouseMove(event);
        case 'mouseenter':
          return this.handleMouseEnter();
        case 'mouseleave':
          return this.handleMouseLeave();
        case 'scroll':
          return this.handleScroll();
      }
    },
    handleMouseMove: function (event: MouseEvent) {
      if (!data.sourceImg.element || !data.zoomedImg.element || !data.zoomLens.element) return;

      const offset = getOffset(data.sourceImg.element);
      const offsetX = zoomLensLeft(event.clientX - offset.left);
      const offsetY = zoomLensTop(event.clientY - offset.top);
      const backgroundTop = offsetX * scale;
      const backgroundRight = offsetY * scale;
      const backgroundPosition = '-' + backgroundTop + 'px ' + '-' + backgroundRight + 'px';
      data.zoomedImg.element.style.backgroundPosition = backgroundPosition;
      data.zoomLens.element.style.cssText += 'top:' + offsetY + 'px;' + 'left:' + offsetX + 'px;display: block;';
    },
    handleMouseEnter: function () {
      if (!data.zoomedImg.element || !data.zoomLens.element) return;
      data.zoomedImg.element.style.display = 'block';
      data.zoomLens.element.style.display = 'block';
    },
    handleMouseLeave: function () {
      if (!data.zoomedImg.element || !data.zoomLens.element) return;
      data.zoomedImg.element.style.display = 'none';
      data.zoomLens.element.style.display = 'none';
    },
    handleScroll: function () {
      if (!data.sourceImg.element) return;
      // offset = getOffset(data.sourceImg.element);
    },
  };

  // Setup/Initialize library
  setup();

  if (data.sourceImg.element?.complete) {
    onSourceImgLoad();
  }
  if (data.sourceImg.element) {
    data.sourceImg.element.onload = onSourceImgLoad;
  }

  return {
    setup: function () {
      setup();
    },
    kill: function () {
      kill();
    },
  };
}
