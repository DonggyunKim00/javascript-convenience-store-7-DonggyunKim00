class Product {
  #productInfo;

  constructor(productInfo) {
    this.#productInfo = productInfo;
  }

  getInfo() {
    return this.#productInfo;
  }
}

export default Product;
