import Product from '../src/model/Product';
import Stock from '../src/model/Stock';

describe('재고 테스트', () => {
  let stock;

  beforeEach(() => {
    const products = [
      new Product({ name: '베지밀', price: 1000, quantity: 9, promotion: '1+1' }),
      new Product({ name: '면도기', price: 5000, quantity: 5, promotion: null }),
      new Product({ name: '칫솔', price: 3000, quantity: 2, promotion: null }),
    ];

    stock = new Stock(products);
  });

  test('상품들의 최신 재고 상태에 대한 정보를 제공할 수 있다.', () => {
    expect(stock.getProductsInfo()).toEqual([
      { name: '베지밀', price: 1000, quantity: 9, promotion: '1+1' },
      { name: '면도기', price: 5000, quantity: 5, promotion: null },
      { name: '칫솔', price: 3000, quantity: 2, promotion: null },
    ]);
  });
});
