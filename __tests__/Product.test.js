import Product from '../src/model/Product.js';

describe('상품 테스트', () => {
  test('이름, 가격, 개수, 프로모션 정보를 받아 상품을 생성할 수 있다.', () => {
    const productInfo = {
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: '탄산2+1',
    };

    const product = new Product(productInfo);

    expect(product.getInfo()).toEqual(productInfo);
  });

  test('상품 개수를 차감 시킬 수 있다.', () => {
    const productInfo = {
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: '탄산2+1',
    };

    const answer = {
      name: '콜라',
      price: 1000,
      quantity: 8,
      promotion: '탄산2+1',
    };

    const coke = new Product(productInfo);

    coke.decrease(2);

    expect(coke.getInfo()).toEqual(answer);
  });
});
