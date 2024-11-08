import PosMachine from '../src/model/PosMachine';
import Product from '../src/model/Product';
import Stock from '../src/model/Stock';

describe('포스기 테스트', () => {
  let posMachine;

  beforeEach(() => {
    const orders = [
      ['프로틴바', 2],
      ['소고기', 3],
    ];
    const stock = new Stock([
      new Product({ name: '프로틴바', price: 1000, quantity: 5, promotion: '1+1' }),
      new Product({ name: '소고기', price: 10000, quantity: 3, promotion: null }),
      new Product({ name: '돼지고기', price: 3000, quantity: 2, promotion: null }),
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
    ];
    expect(posMachine.getOrderInfo()).toEqual(answer);
  });
});
