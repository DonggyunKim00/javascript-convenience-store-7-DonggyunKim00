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

  canDecreaseQuantityInStock(name, quantity) {
    const totalQuantity = this.getProductsInStockByName(name)
      .map((product) => product.getInfo().quantity)
      .reduce((acc, cur) => acc + cur, 0);

    return totalQuantity >= quantity;
  }

  hasProductNameInStock(name) {
    return this.getProductsInStockByName(name).length > 0;
  }

  getProductsInStockByName(name) {
    return this.#products.filter((item) => item.getInfo().name === name);
  }
}

export default Stock;
