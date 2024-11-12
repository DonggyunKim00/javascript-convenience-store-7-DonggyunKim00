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

  test.each(['베지밀', '면도기', '칫솔'])('%s 은(는) 재고에 존재한다.', (name) => {
    expect(stock.hasProductNameInStock(name)).toBe(true);
  });

  test.each(['동균', '김동균', '프로틴주스'])('%s 은(는) 재고에 존재하지 않는다.', (name) => {
    expect(stock.hasProductNameInStock(name)).toBe(false);
  });

  test.each([
    { name: '베지밀', quantity: 20 },
    { name: '면도기', quantity: 10 },
    { name: '칫솔', quantity: 10 },
  ])(
    '$name의 총 재고 수량이 $quantity 보다 적기 때문에 수량을 차감할 수 없다.',
    ({ name, quantity }) => {
      expect(stock.canDecreaseQuantityInStock(name, quantity)).toBe(false);
    },
  );

  test.each([
    { name: '베지밀', quantity: 9 },
    { name: '면도기', quantity: 4 },
    { name: '칫솔', quantity: 2 },
  ])(
    '$name의 총 재고 수량이 $quantity 보다 크거나 같다면 수량을 차감할 수 있다.',
    ({ name, quantity }) => {
      expect(stock.canDecreaseQuantityInStock(name, quantity)).toBe(true);
    },
  );

  test.each([
    {
      name: '베지밀',
      answer: [new Product({ name: '베지밀', price: 1000, quantity: 9, promotion: '1+1' })],
    },
    {
      name: '면도기',
      answer: [new Product({ name: '면도기', price: 5000, quantity: 5, promotion: null })],
    },
    {
      name: '칫솔',
      answer: [new Product({ name: '칫솔', price: 3000, quantity: 2, promotion: null })],
    },
  ])('상품의 이름을 통해 재고를 조회할 수 있다.', ({ name, answer }) => {
    expect(stock.getProductsInStockByName(name)).toEqual(answer);
  });
});
