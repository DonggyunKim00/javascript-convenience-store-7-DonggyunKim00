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
    this.#productInfo.quantity -= count;
  }

  isValidPromotion() {
    if (!this.#productInfo.promotion) return false;
    const { startDate, endDate } = this.#productInfo.promotion;
    const now = DateTimes.now();

    return new Date(startDate) < new Date(now) && new Date(endDate) > new Date(now);
  }

  hasPromotion() {
    return !!this.#productInfo.promotion;
  }
}

export default Product;
