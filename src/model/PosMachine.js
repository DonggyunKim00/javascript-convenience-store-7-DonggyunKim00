class PosMachine {
  #orderList;

  #stock;

  #membership;

  constructor(orders, stock) {
    this.#orderList = orders;
    this.#stock = stock;
  }

  getOrderInfo() {
    return this.#orderList.map(([name, quantity]) => ({
      name,
      quantity,
      totalPrice: this.#stock.getProductsInStockByName(name)[0].getInfo().price * quantity,
    }));
  }
}

export default PosMachine;
