import Receipt from '../src/model/Receipt';

describe('영수증 테스트', () => {
  const shoppingList = [
    {
      product: {
        name: '사이다',
        price: 1000,
        quantity: 8,
      },
      orderAmount: 7,
      presentAmount: 2,
      promotion: 'ANY_PROMOTION',
    },
    {
      product: { name: '물', price: 500, quantity: 10, promotion: null },
      orderAmount: 5,
      presentAmount: 0,
    },
    {
      product: {
        name: '콜라',
        price: 1500,
        quantity: 10,
      },
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
        membershipDiscount: 750,
        totalPay: 20250,
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
        product: { name: '물', price: 500, quantity: 10, promotion: null },
        orderAmount: 5,
        presentAmount: 0,
      },
      {
        product: {
          name: '맥북',
          price: 100000,
          quantity: 10,
        },
        orderAmount: 2,
        presentAmount: 0,
      },
    ];
    const hasMembership = true;

    const receipt = new Receipt(newShoppingList, hasMembership);

    expect(receipt.getPayInfo().membershipDiscount).toBe(8000);
  });
});
