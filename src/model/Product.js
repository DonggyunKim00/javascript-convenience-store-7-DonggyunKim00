class Product {
  #productInfo;

  constructor(productInfo) {
    this.#productInfo = productInfo;
  }

  static create([name, price, quantity, promotion]) {
    return new Product({ name, price, quantity, promotion });
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
