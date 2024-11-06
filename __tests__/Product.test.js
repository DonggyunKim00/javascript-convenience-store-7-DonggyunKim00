import Product from '../src/model/Product.js';

describe('상품 테스트', () => {
  let productInfo;
  let coke;

  beforeEach(() => {
    productInfo = {
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: '탄산2+1',
    };
    coke = new Product(productInfo);
  });

  test('상품을 생성할 수 있다.', () => {
    expect(coke).toBeInstanceOf(Product);
  });

  test('상품의 정보를 조회할 수 있다.', () => {
    expect(coke.getInfo()).toEqual(productInfo);
  });

  test('상품 개수를 차감할 수 있다.', () => {
    coke.decrease(2);
    expect(coke.getInfo().quantity).toBe(8);
  });

  test('구매 수량이 재고 수량을 초과하면 예외를 발생시킨다.', () => {
    expect(() => coke.decrease(100)).toThrow('[ERROR]');
  });

  test('상품 개수가 변경되었을 때 최신 정보를 조회할 수 있다.', () => {
    coke.decrease(10);
    const updatedInfo = {
      ...productInfo,
      quantity: 0,
    };

    expect(coke.getInfo()).toEqual(updatedInfo);
  });
});
