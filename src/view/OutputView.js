import { Console } from '@woowacourse/mission-utils';
import { formatWithPaddingEnd, formatWithPaddingStart } from '../utils/parse.js';

const OutputView = {
  OUTPUT_MESSAGE: Object.freeze({
    WELCOME_INTRO: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',

    PRODUCT_INFO: (name, price, quantity, promotionName) =>
      `- ${name} ${price}원 ${quantity} ${promotionName}`,

    STORE_NAME: '===========W 편의점===========\n상품명\t\t 수량\t 금액',

    ORDER_PRODUCT: (name, quantity, price) => {
      const namePadded = formatWithPaddingEnd(name, 17);
      const quantityPadded = formatWithPaddingEnd(quantity.toString(), 5);
      const pricePadded = formatWithPaddingStart(price, 8);
      return `${namePadded}${quantityPadded}${pricePadded}`;
    },

    PRESENT_PRODUCT: (name, quantity) => {
      const namePadded = formatWithPaddingEnd(name, 17);
      const quantityPadded = formatWithPaddingEnd(quantity.toString(), 5);
      return `${namePadded}${quantityPadded}`;
    },

    STORE_PRESENT: '===========증    정===========',

    SEPERATOR: '==============================',

    PAY_INFO: (type, name, price, quantity = '') => {
      let formattedPrice = price;
      if (type === 'minus' && price === '0') formattedPrice = `-${price}${' '.repeat(4)}`;
      if (type === 'minus' && price !== '0') formattedPrice = `-${price}`;

      return `${formatWithPaddingEnd(name, 17)}${formatWithPaddingEnd(quantity.toString(), 5)}${formatWithPaddingStart(formattedPrice, 8)}`;
    },
  }),

  printBlankLine() {
    Console.print('');
  },

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
      Console.print(
        this.OUTPUT_MESSAGE.ORDER_PRODUCT(name, quantity, totalPrice.toLocaleString('ko-KR')),
      );
    });
  },

  printPresent(presentList) {
    if (presentList.length) {
      Console.print(this.OUTPUT_MESSAGE.STORE_PRESENT);
      presentList.forEach(({ name, quantity }) => {
        Console.print(this.OUTPUT_MESSAGE.PRESENT_PRODUCT(name, quantity));
      });
    }
  },

  printPayInfo(payInfo) {
    const { totalOrderCount, shoppingTotalPrice, promotionDiscount, membershipDiscount, totalPay } =
      payInfo;
    Console.print(this.OUTPUT_MESSAGE.SEPERATOR);
    this.printTotalPrice(shoppingTotalPrice, totalOrderCount);
    this.printPromotionDiscount(promotionDiscount);
    this.printMembershipDiscount(membershipDiscount);
    this.printTotalPay(totalPay);
  },

  printTotalPrice(shoppingTotalPrice, totalOrderCount) {
    Console.print(
      this.OUTPUT_MESSAGE.PAY_INFO(
        'plus',
        '총구매액',
        shoppingTotalPrice.toLocaleString('ko-KR'),
        totalOrderCount,
      ),
    );
  },

  printPromotionDiscount(promotionDiscount) {
    Console.print(
      this.OUTPUT_MESSAGE.PAY_INFO('minus', '행사할인', promotionDiscount.toLocaleString('ko-KR')),
    );
  },

  printMembershipDiscount(membershipDiscount) {
    Console.print(
      this.OUTPUT_MESSAGE.PAY_INFO(
        'minus',
        '멤버십할인',
        membershipDiscount.toLocaleString('ko-KR'),
      ),
    );
  },

  printTotalPay(totalPay) {
    Console.print(this.OUTPUT_MESSAGE.PAY_INFO('plus', '내실돈', totalPay.toLocaleString('ko-KR')));
  },
};

export default OutputView;
