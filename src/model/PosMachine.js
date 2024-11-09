class PosMachine {
  #orderList;

  #stock;

  constructor(orders, stock) {
    this.#orderList = orders;
    this.#stock = stock;
  }

  getOrderInfo() {
    return this.#orderList.map(([name, quantity]) => ({
      name,
      quantity,
      totalPrice: this.#getOrderProductsStock(name)[0].getInfo().price * quantity,
    }));
  }

  #getOrderProductsStock(name) {
    return this.#stock.getProductsInStockByName(name);
  }

  checkOrderAboutPromotionProduct() {
    return this.#orderList.reduce((acc, [name, amount]) => {
      const { info, isPromotionValid } = this.#findProductsHasPromotion(name);
      if (!info) return acc;
      const quantity = Math.min(info.quantity, amount);
      acc.push({ info, quantity, amount, isPromotionValid });
      return acc;
    }, []);
  }

  #findProductsHasPromotion(name) {
    const product = this.#getOrderProductsStock(name).find((item) => item.hasPromotion());
    if (!product) return { info: null, isPromotionValid: null };
    return { info: product.getInfo(), isPromotionValid: product.isValidPromotion() };
  }

  checkOrderAboutGeneralProduct() {
    return this.#orderList.reduce((acc, [name, amount]) => {
      const { info } = this.#findProductsNotHasPromotion(name);
      if (!info) return acc;
      acc.push({ product: info, orderAmount: amount });
      return acc;
    }, []);
  }

  #findProductsNotHasPromotion(name) {
    const products = this.#getOrderProductsStock(name);
    if (products.length > 1) return { info: null };
    if (products[0].hasPromotion()) return { info: null };
    return { info: products[0].getInfo() };
  }

  decreaseStock(shoppingList) {
    shoppingList
      .map(({ product, orderAmount }) => this.#makeNewShoppingList(product, orderAmount))
      .flat()
      .forEach(([product, decreaseNum]) => {
        product.decrease(decreaseNum);
      });
  }

  #makeNewShoppingList(product, orderAmount) {
    const products = this.#stock.getProductsInStockByName(product.name);
    if (products.length > 1)
      return products.map((item) => {
        if (item.hasPromotion()) return [item, Math.min(product.quantity, orderAmount)];
        return [item, orderAmount - Math.min(product.quantity, orderAmount)];
      });
    return products.map((item) => [item, orderAmount]);
  }
}

export default PosMachine;
