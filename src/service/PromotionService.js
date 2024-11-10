import { readAndValidateFreeAddition, readAndValidatePurchase } from '../utils/readInput.js';

class PromotionService {
  static async promotionInputSystem({ product, quantity, amount }, result) {
    if (!product.isValidPromotion())
      return await PromotionService.#whenInvalidPromotion(product, amount, result);
    if (product.getInfo().promotion.buy === 1 && product.isValidPromotion())
      return await PromotionService.#whenBuyOnePlusOne(product, quantity, amount, result);
    if (product.getInfo().promotion.buy === 2 && product.isValidPromotion())
      return await PromotionService.#whenBuyTwoPlusOne(product, quantity, amount, result);
    return null;
  }

  static async #whenInvalidPromotion(product, amount, result) {
    await result.push({ product, orderAmount: amount, presentAmount: 0 });
  }

  static async #whenBuyOnePlusOne(product, quantity, amount, result) {
    const nonePromotion = amount - quantity + product.getInfo().promotion.get;

    if (amount < product.getInfo().quantity && amount % 2 === 1)
      return await PromotionService.#pushAdditionResult(product, quantity, result);
    if (amount >= product.getInfo().quantity)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion, result);
    return result.push({ product, orderAmount: amount, presentAmount: quantity / 2 });
  }

  static async #whenBuyTwoPlusOne(product, quantity, amount, result) {
    const productQuantity = product.getInfo().quantity;
    const nonePromotion = amount - quantity;
    if (productQuantity > amount && amount % 3 === 2)
      return await PromotionService.#pushAdditionResult(product, quantity, result);
    if (productQuantity % 3 === 1 && amount > quantity)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion + 1, result);
    if (productQuantity % 3 === 2 && (amount > quantity || amount === productQuantity))
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion + 2, result);
    return result.push({ product, orderAmount: amount, presentAmount: Math.floor(quantity / 3) });
  }

  static async #pushPurchaseResult(product, amount, nonePromotion, result) {
    const { promotion, quantity, name } = product.getInfo();
    let orderAmount = amount;
    if ((await readAndValidatePurchase(name, nonePromotion)) === 'N') orderAmount -= nonePromotion;
    const maxPresentAmount = Math.floor(quantity / (promotion.get + promotion.buy));
    const presentAmount = Math.floor(
      Math.min(maxPresentAmount, orderAmount / (promotion.get + promotion.buy)),
    );
    result.push({ product, orderAmount, presentAmount });
  }

  static async #pushAdditionResult(product, quantity, result) {
    const { promotion, name } = product.getInfo();
    let orderAmount = quantity;
    if ((await readAndValidateFreeAddition(name)) === 'Y') orderAmount += 1;
    const presentAmount = Math.floor(orderAmount / (promotion.get + promotion.buy));
    result.push({ product, orderAmount, presentAmount });
  }
}

export default PromotionService;
