import { MissionUtils } from '@woowacourse/mission-utils';
import PromotionService from '../src/service/PromotionService';
import Product from '../src/model/Product';

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error('NO INPUT');
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

describe('프로모션 서비스 테스트', () => {
  let result;

  beforeEach(() => {
    result = [];
  });

  test.each([
    {
      product: Product.create([
        '프로틴쉐이크',
        3500,
        4,
        { startDate: '2021-01-01', endDate: '2021-01-02' },
      ]),
      quantity: 3,
      amount: 3,
      answer: {
        product: Product.create([
          '프로틴쉐이크',
          3500,
          4,
          { startDate: '2021-01-01', endDate: '2021-01-02' },
        ]),
        orderAmount: 3,
        presentAmount: 0,
      },
    },
    {
      product: Product.create([
        '맥북M4',
        3000000,
        4,
        { startDate: '2021-01-01', endDate: '2021-01-02' },
      ]),
      quantity: 2,
      amount: 2,
      answer: {
        product: Product.create([
          '맥북M4',
          3000000,
          4,
          { startDate: '2023-11-01', endDate: '2024-10-03' },
        ]),
        orderAmount: 2,
        presentAmount: 0,
      },
    },
  ])(
    '유효하지 않은 프로모션을 가진 상품은 일반 상품과 동일한 처리를 할 수 있다.',
    async ({ product, quantity, amount, answer }) => {
      await PromotionService.promotionInputSystem({ product, quantity, amount }, result);

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      product: Product.create([
        '오렌지주스',
        1800,
        2,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 1,
      amount: 1,
      inputs: ['Y'],
      answer: {
        product: Product.create([
          '오렌지주스',
          1800,
          2,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 2,
        presentAmount: 1,
      },
    },
    {
      product: Product.create([
        '오렌지주스',
        1800,
        2,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 1,
      amount: 1,
      inputs: ['N'],
      answer: {
        product: Product.create([
          '오렌지주스',
          1800,
          9,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 1,
        presentAmount: 0,
      },
    },
    {
      product: Product.create([
        '감자칩',
        1500,
        5,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 3,
      amount: 3,
      inputs: ['Y'],
      answer: {
        product: Product.create([
          '감자칩',
          1500,
          5,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 4,
        presentAmount: 2,
      },
    },
    {
      product: Product.create([
        '감자칩',
        1500,
        5,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 3,
      amount: 3,
      inputs: ['N'],
      answer: {
        product: Product.create([
          '감자칩',
          1500,
          5,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 3,
        presentAmount: 1,
      },
    },
  ])(
    '1+1 상품에서 무료로 상품을 더 받을지 결정할 수 있다.',
    async ({ product, quantity, amount, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem({ product, quantity, amount }, result);

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      product: Product.create([
        '감자칩',
        1500,
        5,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 5,
      amount: 8,
      inputs: ['Y'],
      answer: {
        product: Product.create([
          '감자칩',
          1500,
          5,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 8,
        presentAmount: 2,
      },
    },
    {
      product: Product.create([
        '감자칩',
        1500,
        5,
        { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 5,
      amount: 10,
      inputs: ['N'],
      answer: {
        product: Product.create([
          '감자칩',
          1500,
          5,
          { buy: 1, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 4,
        presentAmount: 2,
      },
    },
  ])(
    '1+1 상품에서 프로모션을 못받는 상품을 그대로 결제할지 결정할 수 있다.',
    async ({ product, quantity, amount, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem({ product, quantity, amount }, result);

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      product: Product.create([
        '탄산수',
        1200,
        5,
        { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 2,
      amount: 2,
      inputs: ['Y'],
      answer: {
        product: Product.create([
          '탄산수',
          1200,
          5,
          { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 3,
        presentAmount: 1,
      },
    },
    {
      product: Product.create([
        '콜라',
        1000,
        10,
        { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 8,
      amount: 8,
      inputs: ['N'],
      answer: {
        product: Product.create([
          '콜라',
          1000,
          10,
          { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 8,
        presentAmount: 2,
      },
    },
  ])(
    '2+1 상품에서 무료로 상품을 더 받을지 결정할 수 있다.',
    async ({ product, quantity, amount, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem({ product, quantity, amount }, result);

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      product: Product.create([
        '사이다',
        1000,
        8,
        { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
      ]),
      quantity: 8,
      amount: 10,
      inputs: ['Y'],
      answer: {
        product: Product.create([
          '사이다',
          1000,
          8,
          { buy: 2, get: 1, startDate: '2024-11-01', endDate: '2024-12-31' },
        ]),
        orderAmount: 10,
        presentAmount: 2,
      },
    },
  ])(
    '2+1 상품에서 프로모션을 못받는 상품을 그대로 결제할지 결정할 수 있다.',
    async ({ product, quantity, amount, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem({ product, quantity, amount }, result);

      expect(result).toEqual([answer]);
    },
  );
});
