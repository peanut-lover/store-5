import React from 'react';

import { render, cleanup, waitFor } from '@testing-library/react';
import { Promotion } from '@src/types/Promotion';
import PromotionCarousel from '@src/components/PromotionCarousel/PromotionCarousel';

describe('GoodsSection Component', () => {
  it('should render only 2 slide in carousel', async () => {
    // 현재 보여지고있는 슬라이드와 다음 슬라이드가 hidden true, 그외는 hidden false
    // 결론: 항상 동시에 보여지고 있는 슬라이드는 2개다.
    const countOfShowSlide = 2;

    const mock_promotions: Promotion[] = [
      { id: 1, imgUrl: 'TEST1', goodsId: 1 },
      { id: 2, imgUrl: 'TEST2', goodsId: 2 },
      { id: 3, imgUrl: 'TEST3', goodsId: 3 },
    ];
    const wrapper = render(<PromotionCarousel promotions={mock_promotions} />);

    const totalSlideElments = wrapper.container.querySelectorAll('.slick-slide');
    const countOfTotalSlide = Array.from(totalSlideElments).length;

    const showSlideElements = wrapper.container.querySelectorAll('.slick-slide[aria-hidden="true"]');
    expect(Array.from(showSlideElements).length).toBe(countOfShowSlide);

    const hiddenSlideElements = wrapper.container.querySelectorAll('.slick-slide[aria-hidden="false"]');
    expect(Array.from(hiddenSlideElements).length).toBe(countOfTotalSlide - countOfShowSlide);
  });

  afterAll(cleanup);
});
