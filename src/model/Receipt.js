class Receipt {
  #shoppingList;

  #hasMembership;

  #initPayInfo = {
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
      name: product.name,
      quantity: orderAmount,
      totalPrice: product.price * orderAmount,
    }));
  }

  getPresentList() {
    return this.#shoppingList.reduce((acc, { product, presentAmount }) => {
      const newAcc = acc;
      if (presentAmount) acc.push({ name: product.name, quantity: presentAmount });
      return newAcc;
    }, []);
  }

  getMoneyInfo() {
    return this.#shoppingList.reduce(
      (acc, { product, orderAmount, presentAmount }) =>
        this.#moneyInfoCalculate(acc, product, orderAmount, presentAmount),
      this.#initPayInfo,
    );
  }

  #moneyInfoCalculate(acc, product, orderAmount, presentAmount) {
    acc.shoppingTotalPrice += product.price * orderAmount;
    acc.promotionDiscount += product.price * presentAmount;
    if (this.#hasMembership && !presentAmount) {
      acc.membershipDiscount += product.price * orderAmount * 0.3;
      acc.membershipDiscount = Math.min(8000, acc.membershipDiscount);
    }
    acc.totalPay = acc.shoppingTotalPrice - acc.promotionDiscount - acc.membershipDiscount;
    return acc;
  }
}

export default Receipt;
