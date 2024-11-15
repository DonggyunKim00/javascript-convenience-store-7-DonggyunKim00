import { Console } from '@woowacourse/mission-utils';

const InputView = {
  INPUT_MESSAGE: Object.freeze({
    ORDER_GUIDE: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    PROMOTION_FREE_GUIDE: (productName) =>
      `\n현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
    PROMOTION_FAIL_GUIDE: (productName, amount) =>
      `\n현재 ${productName} ${amount}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,
    MEMBERSHIP_APPLY_GUIDE: '\n멤버십 할인을 받으시겠습니까? (Y/N)\n',
    OUTRO_GUIDE: '\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
  }),

  async readOrders() {
    const input = await Console.readLineAsync(this.INPUT_MESSAGE.ORDER_GUIDE);
    return input;
  },

  async readFreeAdditionConfirmation(productName) {
    const input = await Console.readLineAsync(this.INPUT_MESSAGE.PROMOTION_FREE_GUIDE(productName));
    return input;
  },

  async readPurchaseConfirmation(productName, amount) {
    const input = await Console.readLineAsync(
      this.INPUT_MESSAGE.PROMOTION_FAIL_GUIDE(productName, amount),
    );
    return input;
  },

  async readMembershipConfirmation() {
    const input = await Console.readLineAsync(this.INPUT_MESSAGE.MEMBERSHIP_APPLY_GUIDE);
    return input;
  },

  async readContinueShopping() {
    const input = await Console.readLineAsync(this.INPUT_MESSAGE.OUTRO_GUIDE);
    return input;
  },
};

export default InputView;
