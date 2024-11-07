import { validateOrderData, validateOrderInput, validateYorN } from '../src/utils/validate.js';

describe('validate 테스트', () => {
  test.each(['[동균-123]', '[1111-1]', '[콜라-10]'])(
    'validateOrderInput(): input으로 "%s" 들어왔을때 통과한다.',
    (input) => {
      expect(() => validateOrderInput(input)).not.toThrow();
    },
  );

  test.each([
    '',
    undefined,
    null,
    '[동균--123]',
    '[1111]',
    '[콜라-123',
    '콜라-123',
    '[abc-1a]',
    '[-]',
    '[ - ]',
  ])('validateOrderInput(): input으로 "%s" 들어왔을때 예외가 발생한다.', (input) => {
    expect(() => validateOrderInput(input)).toThrow();
  });

  test.each(['Y', 'N'])('validateYorN(): input으로 "%s" 들어왔을때 통과한다.', (input) => {
    expect(() => validateYorN(input)).not.toThrow();
  });

  test.each(['', undefined, null, 'O', 'X', 'y', 'n'])(
    'validateYorN(): input으로 "%s" 들어왔을때 예외가 발생한다.',
    (input) => {
      expect(() => validateYorN(input)).toThrow();
    },
  );

  test('validateOrderData(): hasProduct:true, isExceedQuantity:true 일때 통과한다.', () => {
    const hasProduct = true;
    const isExceedQuantity = true;
    expect(() => validateOrderData(hasProduct, isExceedQuantity)).not.toThrow();
  });

  test.each([
    { hasProduct: false, isExceedQuantity: false },
    { hasProduct: true, isExceedQuantity: false },
    { hasProduct: false, isExceedQuantity: true },
  ])(
    'validateOrderData(): hasProduct:$hasProduct, isExceedQuantity:$isExceedQuantity 가  들어왔을때 예외가 발생한다.',
    ({ hasProduct, isExceedQuantity }) => {
      expect(() => validateOrderData(hasProduct, isExceedQuantity)).toThrow();
    },
  );
});
