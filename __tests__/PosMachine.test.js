import PosMachine from '../src/model/PosMachine';
import Product from '../src/model/Product';
import Stock from '../src/model/Stock';

describe('포스기 테스트', () => {
  let posMachine;

  beforeEach(() => {
    const orders = [
      ['프로틴바', 2],
      ['소고기', 3],
      ['맥북', 3],
    ];
    const stock = new Stock([
      new Product({
        name: '프로틴바',
        price: 1000,
        quantity: 5,
        promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
      }),
      new Product({ name: '소고기', price: 10000, quantity: 3, promotion: null }),
      new Product({ name: '돼지고기', price: 3000, quantity: 2, promotion: null }),
      new Product({
        name: '돼지고기',
        price: 3000,
        quantity: 2,
        promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
      }),
      new Product({
        name: '맥북',
        price: 2000000,
        quantity: 10,
        promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
      }),
      new Product({ name: '맥북', price: 2000000, quantity: 10, promotion: null }),
    ]);
    posMachine = new PosMachine(orders, stock);
  });

  test('주문한 상품의 이름,수량,금액을 조회할 수 있다.', () => {
    const answer = [
      {
        name: '프로틴바',
        quantity: 2,
        totalPrice: 2000,
      },
      {
        name: '소고기',
        quantity: 3,
        totalPrice: 30000,
      },
      {
        name: '맥북',
        quantity: 3,
        totalPrice: 6000000,
      },
    ];
    expect(posMachine.getOrderInfo()).toEqual(answer);
  });

  test('주문 항목에 대해 프로모션이 적용 가능한 제품 정보를 재고에서 찾아 정리할 수 있다.', () => {
    const answer = [
      {
        info: {
          name: '프로틴바',
          price: 1000,
          quantity: 5,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        quantity: 2,
        amount: 2,
        isPromotionValid: true,
      },
      {
        info: {
          name: '맥북',
          price: 2000000,
          quantity: 10,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        quantity: 3,
        amount: 3,
        isPromotionValid: true,
      },
    ];
    expect(posMachine.checkOrderAboutPromotionProduct()).toEqual(answer);
  });

  test('주문 항목에 대해 프로모션이 존재하지 않는 제품 정보를 재고에서 찾아 정리할 수 있다.', () => {
    const answer = [
      {
        product: { name: '소고기', price: 10000, quantity: 3, promotion: null },
        orderAmount: 3,
      },
    ];
    expect(posMachine.checkOrderAboutGeneralProduct()).toEqual(answer);
  });
});
