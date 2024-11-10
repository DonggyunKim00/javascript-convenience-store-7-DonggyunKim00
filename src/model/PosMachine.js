class PosMachine {
  #orderList;

  #stock;

  constructor(orders, stock) {
    this.#orderList = orders;
    this.#stock = stock;
  }

  #getOrderProductsStock(name) {
    const promotionProduct =
      this.#stock.getProductsInStockByName(name).find((item) => item.hasPromotion()) || null;
    const generalProduct =
      this.#stock.getProductsInStockByName(name).find((item) => !item.hasPromotion()) || null;

    return { promotionProduct, generalProduct };
  }

  checkOrderAboutPromotionProduct() {
    return this.#orderList.reduce((acc, [name, amount]) => {
      const { product } = this.#findProductsHasPromotion(name);
      if (!product) return acc;
      const quantity = Math.min(product.getInfo().quantity, amount);
      acc.push({ product, quantity, amount });
      return acc;
    }, []);
  }

  #findProductsHasPromotion(name) {
    const { promotionProduct } = this.#getOrderProductsStock(name);
    if (!promotionProduct || !promotionProduct.getInfo().quantity) return { product: null };
    return {
      product: promotionProduct,
    };
  }

  checkOrderAboutGeneralProduct() {
    return this.#orderList.reduce((acc, [name, amount]) => {
      const { product } = this.#findProductsNotHasPromotion(name);
      if (!product) return acc;
      acc.push({ product, orderAmount: amount, presentAmount: 0 });
      return acc;
    }, []);
  }

  #findProductsNotHasPromotion(name) {
    const { promotionProduct, generalProduct } = this.#getOrderProductsStock(name);
    if (!promotionProduct || !generalProduct) {
      if (promotionProduct) return { product: null };
      return { product: generalProduct };
    }
    if (promotionProduct && promotionProduct.getInfo().quantity === 0)
      return { product: generalProduct };
    return { product: null };
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
    const products = this.#stock
      .getProductsInStockByName(product.getInfo().name)
      .filter((item) => item.getInfo().quantity);
    if (products.length > 1)
      return products.map((item) => {
        if (item.hasPromotion()) return [item, Math.min(product.getInfo().quantity, orderAmount)];
        return [item, orderAmount - Math.min(product.getInfo().quantity, orderAmount)];
      });
    return products.map((item) => [item, orderAmount]);
  }
}

export default PosMachine;
