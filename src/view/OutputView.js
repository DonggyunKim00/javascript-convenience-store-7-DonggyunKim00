import { Console } from '@woowacourse/mission-utils';
import { getTextLength } from '../utils/parse.js';

const OutputView = {
  OUTPUT_MESSAGE: Object.freeze({
    WELCOME_INTRO: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',
    PRODUCT_INFO: (name, price, quantity, promotionName) =>
      `- ${name} ${price}원 ${quantity} ${promotionName}`,
    STORE_NAME: '===========W 편의점=============\n상품명\t\t 수량\t 금액',
    ORDER_PRODUCT: (name, quantity, price) => {
      const namePadded = name + ' '.repeat(17 - getTextLength(name));
      const quantityPadded =
        quantity.toString() + ' '.repeat(8 - getTextLength(quantity.toString()));
      const pricePadded = price.toString().toLocaleString('ko-KR');

      return `${namePadded}${quantityPadded}${pricePadded}`;
    },
    PRESENT_PRODUCT: (name, quantity) => {
      const namePadded = name + ' '.repeat(17 - getTextLength(name));
      const quantityPadded =
        quantity.toString() + ' '.repeat(8 - getTextLength(quantity.toString()));

      return `${namePadded}${quantityPadded}`;
    },
    STORE_PRESENT: '===========증    정=============',
    SEPERATOR: '================================',
  }),

  printIntro() {
    Console.print(this.OUTPUT_MESSAGE.WELCOME_INTRO);
  },

  printOneProduct(name, price, quantity, promotion) {
    let stringQuantity = '재고 없음';
    if (quantity) stringQuantity = `${quantity}개`;

    let promotionName = '';
    if (promotion) promotionName = promotion.name;

    Console.print(this.OUTPUT_MESSAGE.PRODUCT_INFO(name, price, stringQuantity, promotionName));
  },

  printError(message) {
    Console.print(`[ERROR] ${message}`);
  },

  printOrders(orders) {
    Console.print(this.OUTPUT_MESSAGE.STORE_NAME);
    orders.forEach(({ name, quantity, totalPrice }) => {
      Console.print(this.OUTPUT_MESSAGE.ORDER_PRODUCT(name, quantity, totalPrice));
    });
  },

  printPresent() {
    Console.print(this.OUTPUT_MESSAGE.STORE_PRESENT);
    Console.print(this.OUTPUT_MESSAGE.PRESENT_PRODUCT('사이다', 1));
  },

  printCalculate() {
    Console.print(this.OUTPUT_MESSAGE.SEPERATOR);
  },
};

export default OutputView;
