import Product from '../src/model/Product';
import Receipt from '../src/model/Receipt';

describe('영수증 테스트', () => {
  const shoppingList = [
    {
      product: Product.create([
        '사이다',
        1000,
        8,
        { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      orderAmount: 7,
      presentAmount: 2,
      promotion: 'ANY_PROMOTION',
    },
    {
      product: Product.create(['물', 500, 10, null]),
      orderAmount: 5,
      presentAmount: 0,
    },
    {
      product: Product.create([
        '콜라',
        1500,
        10,
        { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      orderAmount: 12,
      presentAmount: 3,
      promotion: 'ANY_PROMOTION',
    },
  ];

  test('영수증에 출력할 구매 상품 내역을 조회할 수 있다.', () => {
    const hasMembership = true;
    const answer = [
      { name: '사이다', quantity: 7, totalPrice: 7000 },
      { name: '물', quantity: 5, totalPrice: 2500 },
      { name: '콜라', quantity: 12, totalPrice: 18000 },
    ];

    const receipt = new Receipt(shoppingList, hasMembership);

    expect(receipt.getShoppingList()).toEqual(answer);
  });

  test('영수증에 출력할 증정 상품 내역을 조회할 수 있다.', () => {
    const hasMembership = true;
    const answer = [
      { name: '사이다', quantity: 2 },
      { name: '콜라', quantity: 3 },
    ];

    const receipt = new Receipt(shoppingList, hasMembership);

    expect(receipt.getPresentList()).toEqual(answer);
  });

  test.each([
    {
      hasMembership: true,
      answer: {
        totalOrderCount: 24,
        shoppingTotalPrice: 27500,
        promotionDiscount: 6500,
        membershipDiscount: 2400,
        totalPay: 18600,
      },
    },
    {
      hasMembership: false,
      answer: {
        totalOrderCount: 24,
        shoppingTotalPrice: 27500,
        promotionDiscount: 6500,
        membershipDiscount: 0,
        totalPay: 21000,
      },
    },
  ])(
    '멤버쉽 유무에 따라 영수증에 출력할 금액 정보를 조회할 수 있다.',
    ({ hasMembership, answer }) => {
      const receipt = new Receipt(shoppingList, hasMembership);

      expect(receipt.getPayInfo()).toEqual(answer);
    },
  );

  test('멤버십 할인의 최대 한도는 8,000원 이다.', () => {
    const newShoppingList = [
      {
        product: Product.create(['물', 500, 10, null]),
        orderAmount: 5,
        presentAmount: 0,
      },
      {
        product: Product.create(['맥북', 1000000, 10, null]),
        orderAmount: 2,
        presentAmount: 0,
      },
    ];
    const hasMembership = true;

    const receipt = new Receipt(newShoppingList, hasMembership);

    expect(receipt.getPayInfo().membershipDiscount).toBe(8000);
  });
});
