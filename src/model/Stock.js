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
    const totalQuantity = this.#filterProductsInStock(name)
      .map((product) => product.getInfo().quantity)
      .reduce((acc, cur) => acc + cur, 0);

    if (totalQuantity < quantity) return false;
    return true;
  }

  hasProductNameInStock(name) {
    const matchProducts = this.#filterProductsInStock(name);

    if (!matchProducts.length) return false;
    return true;
  }

  #filterProductsInStock(name) {
    return this.#products.filter((item) => item.getInfo().name === name);
  }
}

export default Stock;
