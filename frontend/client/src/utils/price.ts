// price에 ','를 붙힌 문자열을 반환한다.
export const getPriceText = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 할인이 적용된 금액을 반환한다.
export const getDiscountedPrice = (price: number, discountRate: number) => price * (1 - discountRate / 100);
