import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  OUTPUT_MESSAGE: Object.freeze({
    WELCOME_INTRO: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',
    PRODUCT_INFO: (name, price, quantity, promotionName) =>
      `- ${name} ${price}원 ${quantity} ${promotionName}`,
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
};

export default OutputView;
