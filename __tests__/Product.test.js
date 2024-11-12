import Product from '../src/model/Product.js';

describe('상품 테스트', () => {
  const productInfo = {
    name: '콜라',
    price: 1000,
    quantity: 10,
    promotion: {
      name: '탄산2+1',
      get: 1,
      buy: 2,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
  };
  let coke;

  beforeEach(() => {
    coke = Product.create([
      '콜라',
      1000,
      10,
      {
        name: '탄산2+1',
        get: 1,
        buy: 2,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    ]);
  });

  test('상품을 생성할 수 있다.', () => {
    expect(coke).toBeInstanceOf(Product);
  });

  test('상품의 정보를 조회할 수 있다.', () => {
    expect(coke.getInfo()).toEqual(productInfo);
  });

  test('상품 개수를 차감할 수 있다.', () => {
    coke.decrease(2);

    const { quantity } = coke.getInfo();

    expect(quantity).toBe(8);
  });

  test('상품 개수가 변경되었을 때 최신 정보를 조회할 수 있다.', () => {
    coke.decrease(10);
    const updatedInfo = {
      ...productInfo,
      quantity: 0,
    };

    expect(coke.getInfo()).toEqual(updatedInfo);
  });

  test('상품의 프로모션 기간이 유효한지 판단할 수 있다.', () => {
    const promotionValid = coke.isValidPromotion();

    expect(promotionValid).toBeTruthy();
  });

  test('상품에 프로모션이 존재하는지 확인할 수 있다.', () => {
    expect(coke.hasPromotion()).toBe(true);
  });
});
