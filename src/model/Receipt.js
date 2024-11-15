class Receipt {
  #shoppingList;

  #hasMembership;

  #initPayInfo = {
    totalOrderCount: 0,
    shoppingTotalPrice: 0,
    promotionDiscount: 0,
    membershipDiscount: 0,
    totalPay: 0,
  };

  constructor(shoppingList, hasMembership) {
    this.#shoppingList = shoppingList;
    this.#hasMembership = hasMembership;
  }

  getShoppingList() {
    return this.#shoppingList.map(({ product, orderAmount }) => ({
      name: product.getInfo().name,
      quantity: orderAmount,
      totalPrice: product.getInfo().price * orderAmount,
    }));
  }

  getPresentList() {
    return this.#shoppingList.reduce((acc, { product, presentAmount }) => {
      const newAcc = acc;
      if (presentAmount) acc.push({ name: product.getInfo().name, quantity: presentAmount });
      return newAcc;
    }, []);
  }

  getPayInfo() {
    return this.#shoppingList.reduce(
      (acc, { product, orderAmount, presentAmount }) =>
        this.#moneyInfoCalculate(acc, product, orderAmount, presentAmount),
      this.#initPayInfo,
    );
  }

  #moneyInfoCalculate(acc, product, orderAmount, presentAmount) {
    acc.totalOrderCount += orderAmount;
    acc.shoppingTotalPrice += product.getInfo().price * orderAmount;
    acc.promotionDiscount += product.getInfo().price * presentAmount;
    if (this.#hasMembership)
      acc.membershipDiscount += Receipt.#membershipCalculate(product, orderAmount, presentAmount);
    acc.membershipDiscount = Math.min(8000, acc.membershipDiscount);
    acc.totalPay = acc.shoppingTotalPrice - acc.promotionDiscount - acc.membershipDiscount;
    return acc;
  }

  static #membershipCalculate(product, orderAmount, presentAmount) {
    if (presentAmount)
      return (
        product.getInfo().price *
        (orderAmount -
          presentAmount * (product.getInfo().promotion.buy + product.getInfo().promotion.get)) *
        0.3
      );
    return product.getInfo().price * orderAmount * 0.3;
  }
}

export default Receipt;
