import PosMachine from '../src/model/PosMachine';
import Product from '../src/model/Product';
import Stock from '../src/model/Stock';

describe('포스기 테스트', () => {
  let posMachine;

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

  beforeEach(() => {
    const orders = [
      ['프로틴바', 2],
      ['소고기', 3],
      ['맥북', 12],
    ];
    posMachine = new PosMachine(orders, stock);
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
        quantity: 10,
        amount: 12,
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
        presentAmount: 0,
      },
    ];
    expect(posMachine.checkOrderAboutGeneralProduct()).toEqual(answer);
  });

  test('주문 항목의 재고가 올바르게 감소해야 한다.', () => {
    const shoppingList = [
      {
        product: {
          name: '프로틴바',
          quantity: 5,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        orderAmount: 2,
      },
      { product: { name: '소고기', quantity: 3, promotion: null }, orderAmount: 3 },
      {
        product: {
          name: '맥북',
          quantity: 10,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        orderAmount: 12,
      },
    ];

    posMachine.decreaseStock(shoppingList);

    expect(stock.getProductsInfo()).toEqual(
      expect.arrayContaining([
        {
          name: '프로틴바',
          price: 1000,
          quantity: 3,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        { name: '소고기', price: 10000, quantity: 0, promotion: null },
        {
          name: '맥북',
          price: 2000000,
          quantity: 0,
          promotion: { startDate: '2024-01-01', endDate: '2024-12-31' },
        },
        { name: '맥북', price: 2000000, quantity: 8, promotion: null },
      ]),
    );
  });
});
