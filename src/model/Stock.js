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
    const product = this.#products.find((item) => item.getInfo().name === name);

    if (!product) throw new Error('[ERROR]');

    return product;
  }
}

export default Stock;
