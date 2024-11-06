class Product {
  #productInfo;

  constructor(productInfo) {
    this.#productInfo = productInfo;
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
}

export default Product;
