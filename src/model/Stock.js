class Stock {
  #products = [];

  constructor(products) {
    this.#products = products;
  }

  getProductsInfo() {
    return this.#products.map((product) => product.getInfo());
  }

  decreaseProducts(confirmProductsInfo) {
    confirmProductsInfo.forEach(([name, count]) => {
      const product = this.#findConfirmProduct(name);
      if (product) product.decrease(count);
    });
  }

  #findConfirmProduct(name) {
    return this.#products.find((product) => product.getInfo().name === name);
  }
}

export default Stock;
