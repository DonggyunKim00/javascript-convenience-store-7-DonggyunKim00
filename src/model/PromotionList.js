class PromotionList {
  #promotionList;

  constructor(promotionList) {
    this.#promotionList = promotionList;
  }

  static init(promotionList) {
    const parsePromotionList = promotionList.map(([name, buy, get, startDate, endDate]) => ({
      name,
      buy: Number(buy),
      get: Number(get),
      startDate,
      endDate,
    }));
    return new PromotionList(parsePromotionList);
  }

  findPromotionByName(promotionName) {
    return this.#promotionList.find((promotion) => promotion.name === promotionName);
  }
}

export default PromotionList;
