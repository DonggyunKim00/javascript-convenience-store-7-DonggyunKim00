import { MissionUtils } from '@woowacourse/mission-utils';
import PromotionService from '../src/service/PromotionService';

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
      info: { name: '프로틴쉐이크', price: 3500, quantity: 4, promotion: { buy: 1, get: 1 } },
      quantity: 3,
      amount: 3,
      isPromotionValid: false,
      answer: {
        product: { name: '프로틴쉐이크', price: 3500, quantity: 4, promotion: { buy: 1, get: 1 } },
        orderAmount: 3,
        presentAmount: 0,
      },
    },
    {
      info: { name: '맥북M4', price: 3000000, quantity: 4, promotion: { buy: 1, get: 1 } },
      quantity: 2,
      amount: 2,
      isPromotionValid: false,
      answer: {
        product: { name: '맥북M4', price: 3000000, quantity: 4, promotion: { buy: 1, get: 1 } },
        orderAmount: 2,
        presentAmount: 0,
      },
    },
  ])(
    '유효하지 않은 프로모션을 가진 상품은 일반 상품과 동일한 처리를 할 수 있다.',
    async ({ info, quantity, amount, isPromotionValid, answer }) => {
      await PromotionService.promotionInputSystem(
        { info, quantity, amount, isPromotionValid },
        result,
      );

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      info: { name: '오렌지주스', price: 1800, quantity: 9, promotion: { buy: 1, get: 1 } },
      quantity: 7,
      amount: 7,
      isPromotionValid: true,
      inputs: ['Y'],
      answer: {
        product: { name: '오렌지주스', price: 1800, quantity: 9, promotion: { buy: 1, get: 1 } },
        orderAmount: 8,
        presentAmount: 4,
      },
    },
    {
      info: { name: '오렌지주스', price: 1800, quantity: 9, promotion: { buy: 1, get: 1 } },
      quantity: 3,
      amount: 3,
      isPromotionValid: true,
      inputs: ['N'],
      answer: {
        product: { name: '오렌지주스', price: 1800, quantity: 9, promotion: { buy: 1, get: 1 } },
        orderAmount: 3,
        presentAmount: 1,
      },
    },
    {
      info: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
      quantity: 3,
      amount: 3,
      isPromotionValid: true,
      inputs: ['Y'],
      answer: {
        product: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
        orderAmount: 4,
        presentAmount: 2,
      },
    },
    {
      info: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
      quantity: 3,
      amount: 3,
      isPromotionValid: true,
      inputs: ['N'],
      answer: {
        product: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
        orderAmount: 3,
        presentAmount: 1,
      },
    },
  ])(
    '1+1 상품에서 무료로 상품을 더 받을지 결정할 수 있다.',
    async ({ info, quantity, amount, isPromotionValid, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem(
        { info, quantity, amount, isPromotionValid },
        result,
      );

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      info: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
      quantity: 5,
      amount: 8,
      isPromotionValid: true,
      inputs: ['Y'],
      answer: {
        product: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
        orderAmount: 8,
        presentAmount: 2,
      },
    },
    {
      info: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
      quantity: 5,
      amount: 10,
      isPromotionValid: true,
      inputs: ['N'],
      answer: {
        product: { name: '감자칩', price: 1500, quantity: 5, promotion: { buy: 1, get: 1 } },
        orderAmount: 4,
        presentAmount: 2,
      },
    },
  ])(
    '1+1 상품에서 프로모션을 못받는 상품을 그대로 결제할지 결정할 수 있다.',
    async ({ info, quantity, amount, isPromotionValid, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem(
        { info, quantity, amount, isPromotionValid },
        result,
      );

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      info: { name: '탄산수', price: 1200, quantity: 5, promotion: { buy: 2, get: 1 } },
      quantity: 2,
      amount: 2,
      isPromotionValid: true,
      inputs: ['Y'],
      answer: {
        product: { name: '탄산수', price: 1200, quantity: 5, promotion: { buy: 2, get: 1 } },
        orderAmount: 3,
        presentAmount: 1,
      },
    },
    {
      info: { name: '콜라', price: 1000, quantity: 10, promotion: { buy: 2, get: 1 } },
      quantity: 8,
      amount: 8,
      isPromotionValid: true,
      inputs: ['N'],
      answer: {
        product: { name: '콜라', price: 1000, quantity: 10, promotion: { buy: 2, get: 1 } },
        orderAmount: 8,
        presentAmount: 2,
      },
    },
  ])(
    '2+1 상품에서 무료로 상품을 더 받을지 결정할 수 있다.',
    async ({ info, quantity, amount, isPromotionValid, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem(
        { info, quantity, amount, isPromotionValid },
        result,
      );

      expect(result).toEqual([answer]);
    },
  );

  test.each([
    {
      info: { name: '사이다', price: 1000, quantity: 8, promotion: { buy: 2, get: 1 } },
      quantity: 8,
      amount: 10,
      isPromotionValid: true,
      inputs: ['Y'],
      answer: {
        product: { name: '사이다', price: 1000, quantity: 8, promotion: { buy: 2, get: 1 } },
        orderAmount: 10,
        presentAmount: 2,
      },
    },
    {
      info: { name: '탄산수', price: 1200, quantity: 5, promotion: { buy: 2, get: 1 } },
      quantity: 5,
      amount: 5,
      isPromotionValid: true,
      inputs: ['N'],
      answer: {
        product: { name: '탄산수', price: 1200, quantity: 5, promotion: { buy: 2, get: 1 } },
        orderAmount: 4,
        presentAmount: 1,
      },
    },
  ])(
    '2+1 상품에서 프로모션을 못받는 상품을 그대로 결제할지 결정할 수 있다.',
    async ({ info, quantity, amount, isPromotionValid, inputs, answer }) => {
      mockQuestions(inputs);

      await PromotionService.promotionInputSystem(
        { info, quantity, amount, isPromotionValid },
        result,
      );

      expect(result).toEqual([answer]);
    },
  );
});
