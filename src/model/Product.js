import { DateTimes } from '@woowacourse/mission-utils';

class Product {
  #productInfo;

  constructor(productInfo) {
    this.#productInfo = productInfo;
  }

  static create([name, price, quantity, promotion]) {
    return new Product({ name, price: Number(price), quantity: Number(quantity), promotion });
  }

  getInfo() {
    return this.#productInfo;
  }

  decrease(count) {
    if (count > this.#productInfo.quantity) {
      throw new Error('[ERROR]');
    }

    this.#productInfo.quantity -= count;
  }

  isValidPromotion() {
    const { startDate, endDate } = this.#productInfo.promotion;
    const now = DateTimes.now();

    return new Date(startDate) < new Date(now) && new Date(endDate) > new Date(now);
  }
}

export default Product;
