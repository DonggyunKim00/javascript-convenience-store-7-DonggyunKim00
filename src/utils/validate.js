import { parseOrderInput } from './parse.js';

export const ERROR_MESSAGE = Object.freeze({
  WRONG_ORDER_FORM: '올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
  DOES_NOT_EXIST_PRODUCT: '존재하지 않는 상품입니다. 다시 입력해 주세요.',
  EXCEED_QUANTITY: '재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
  WRONG_INPUT: '잘못된 입력입니다. 다시 입력해 주세요.',
});

const validFunction = {
  isEmptyInput: (input) => !input,

  isValidYesOrNoInput: (input) => input === 'Y' || input === 'N',

  isInvalidFormat: (input) => input.split(',').some((str) => !/^\[.+-[0-9]+\]$/.test(str)),

  hasEmptyField: (input) => parseOrderInput(input).some(([name, quantity]) => !name || !quantity),

  hasProductData: (productsData, orderName) =>
    productsData.find((product) => product.name === orderName),

  hasDuplicateInput: (input) => {
    const flatOrderNames = parseOrderInput(input)
      .map(([name]) => name)
      .flat();

    return flatOrderNames.length !== new Set(flatOrderNames).size;
  },
};

export const validateOrderInput = (input) => {
  if (validFunction.isEmptyInput(input)) throw new Error(ERROR_MESSAGE.WRONG_ORDER_FORM);
  if (validFunction.isInvalidFormat(input)) throw new Error(ERROR_MESSAGE.WRONG_ORDER_FORM);
  if (validFunction.hasEmptyField(input)) throw new Error(ERROR_MESSAGE.WRONG_ORDER_FORM);
  if (validFunction.hasDuplicateInput(input)) throw new Error(ERROR_MESSAGE.WRONG_ORDER_FORM);
};

export const validateOrderData = (hasProduct, isExceedQuantity) => {
  if (!hasProduct) throw new Error(ERROR_MESSAGE.DOES_NOT_EXIST_PRODUCT);
  if (!isExceedQuantity) throw new Error(ERROR_MESSAGE.EXCEED_QUANTITY);
};

export const validateYorN = (input) => {
  if (validFunction.isEmptyInput(input)) throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  if (!validFunction.isValidYesOrNoInput(input)) throw new Error(ERROR_MESSAGE.WRONG_INPUT);
};
