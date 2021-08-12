import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ImageList from './ImageList';

const testImageList: string[] = [
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg',
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg',
  'https://user-images.githubusercontent.com/20085849/128860803-24b0e9a7-1482-4ca6-9a8c-ba30e7271e7a.jpeg',
];

const TestContainer = document.createElement('div');

describe('ImageList Component', () => {
  it('전달받은 이미지 배열의 길이만큼 imageItem을 생성해야 한다.', () => {
    const wrapper = render(<ImageList images={testImageList} />, {
      container: document.body.appendChild(TestContainer),
    });
    expect(wrapper.container.children[0].childNodes).toHaveLength(testImageList.length);
  });

  afterAll(cleanup);
});
