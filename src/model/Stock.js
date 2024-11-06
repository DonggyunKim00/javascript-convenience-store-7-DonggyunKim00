class Stock {
  #products = [];

  constructor(products) {
    this.#products = products;
  }

  getProductsInfo() {
    return this.#products.map((product) => product.getInfo());
  }
}

export default Stock;
