class Product {
  #productInfo;

  constructor(productInfo) {
    this.#productInfo = productInfo;
  }

  getInfo() {
    return this.#productInfo;
  }

  decrease(count) {
    this.#productInfo.quantity -= count;
  }
}

export default Product;
