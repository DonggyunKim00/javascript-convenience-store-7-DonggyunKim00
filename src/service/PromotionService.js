import { readAndValidateFreeAddition, readAndValidatePurchase } from '../utils/readInput.js';

class PromotionService {
  static async promotionInputSystem({ info, quantity, amount, isPromotionValid }, result) {
    if (!isPromotionValid)
      return await PromotionService.#whenInvalidPromotion(info, amount, result);
    if (info.promotion.buy === 1 && isPromotionValid)
      return await PromotionService.#whenBuyOnePlusOne(info, quantity, amount, result);
    if (info.promotion.buy === 2 && isPromotionValid)
      return await PromotionService.#whenBuyTwoPlusOne(info, quantity, amount, result);
    return null;
  }

  static async #whenInvalidPromotion(product, amount, result) {
    await result.push({ product, orderAmount: amount, presentAmount: 0 });
  }

  static async #whenBuyOnePlusOne(product, quantity, amount, result) {
    const nonePromotion = amount - quantity + product.promotion.get;

    if (amount < product.quantity && amount % 2 === 1)
      return await PromotionService.#pushAdditionResult(product, quantity, result);
    if (amount >= product.quantity)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion, result);
    return result.push({ product, orderAmount: amount, presentAmount: quantity / 2 });
  }

  static async #whenBuyTwoPlusOne(product, quantity, amount, result) {
    const nonePromotion = amount - quantity + product.promotion.get;
    if (amount >= product.quantity)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion, result);
    if (quantity === amount && amount % 3 === 1)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion, result);
    if (quantity === amount && amount % 3 === 2)
      return await PromotionService.#pushAdditionResult(product, quantity, result);
    return result.push({ product, orderAmount: amount, presentAmount: quantity / 3 });
  }

  static async #pushPurchaseResult(product, amount, nonePromotion, result) {
    const answer = await readAndValidatePurchase(product.name, nonePromotion);
    let orderAmount = amount;
    if (answer === 'N') orderAmount -= nonePromotion;
    const maxQuantityPerPromotion = product.promotion.get + product.promotion.buy;
    const maxPresentAmount = Math.floor(product.quantity / maxQuantityPerPromotion);
    const presentAmount = Math.floor(
      Math.min(maxPresentAmount, orderAmount / maxQuantityPerPromotion),
    );
    result.push({ product, orderAmount, presentAmount });
  }

  static async #pushAdditionResult(product, quantity, result) {
    const answer = await readAndValidateFreeAddition(product.name);
    let orderAmount = quantity;
    if (answer === 'Y') orderAmount += 1;
    const presentAmount = Math.floor(orderAmount / (product.promotion.get + product.promotion.buy));
    result.push({ product, orderAmount, presentAmount });
  }
}

export default PromotionService;
