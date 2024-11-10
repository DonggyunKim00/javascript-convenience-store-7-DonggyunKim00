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
    const nonePromotion = amount - quantity + product.getInfo().promotion.get;
    if (amount >= product.getInfo().quantity)
      return await PromotionService.#pushPurchaseResult(product, amount, nonePromotion, result);
    if (quantity === amount && amount % 3 === 2)
      return await PromotionService.#pushAdditionResult(product, quantity, result);
    return result.push({ product, orderAmount: amount, presentAmount: Math.floor(quantity / 3) });
  }

  static async #pushPurchaseResult(product, amount, nonePromotion, result) {
    const answer = await readAndValidatePurchase(product.getInfo().name, nonePromotion);
    let orderAmount = amount;
    if (answer === 'N') orderAmount -= nonePromotion;
    const maxQuantityPerPromotion =
      product.getInfo().promotion.get + product.getInfo().promotion.buy;
    const maxPresentAmount = Math.floor(product.getInfo().quantity / maxQuantityPerPromotion);
    const presentAmount = Math.floor(
      Math.min(maxPresentAmount, orderAmount / maxQuantityPerPromotion),
    );
    result.push({ product, orderAmount, presentAmount });
  }

  static async #pushAdditionResult(product, quantity, result) {
    const answer = await readAndValidateFreeAddition(product.getInfo().name);
    let orderAmount = quantity;
    if (answer === 'Y') orderAmount += 1;
    const presentAmount = Math.floor(
      orderAmount / (product.getInfo().promotion.get + product.getInfo().promotion.buy),
    );
    result.push({ product, orderAmount, presentAmount });
  }
}

export default PromotionService;
