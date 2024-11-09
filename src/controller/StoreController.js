import Stock from '../model/Stock.js';
import Product from '../model/Product.js';
import PromotionList from '../model/PromotionList.js';
import { readProductsFile, readPromotionsFile } from '../utils/readFile.js';
import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import { validateOrderInput, validateOrderData } from '../utils/validate.js';
import PosMachine from '../model/PosMachine.js';
import { parseOrderInput } from '../utils/parse.js';
import PromotionService from '../service/PromotionService.js';
import { readAndValidateMembership } from '../utils/readInput.js';
import Receipt from '../model/Receipt.js';

class StoreController {
  #promotionList;

  #stock;

  #posMachine;

  #receipt;

  init() {
    this.#initCreatePromotionList();
    this.#initCreateStock();
  }

  #initCreatePromotionList() {
    this.#promotionList = PromotionList.init(readPromotionsFile());
  }

  #initCreateStock() {
    const products = readProductsFile().map(([name, price, quantity, promotionName]) => {
      const promotion = this.#promotionList.findPromotionByName(promotionName);
      return Product.create([name, price, quantity, promotion]);
    });

    this.#stock = new Stock(products);
  }

  displayStoreStock() {
    OutputView.printIntro();

    this.#stock.getProductsInfo().forEach(({ name, price, quantity, promotion }) => {
      OutputView.printOneProduct(name, price.toLocaleString('ko-KR'), quantity, promotion);
    });
  }

  async purchaseProcess() {
    await this.#createPosMachine();
    const shoppingList = await this.#checkOrderForPromotion();
    this.#posMachine.decreaseStock(shoppingList);
    await this.#createReceipt(shoppingList);
  }

  async #createPosMachine() {
    try {
      const orders = await InputView.readOrders();
      this.#validateOrderProcess(orders);
      this.#posMachine = new PosMachine(parseOrderInput(orders), this.#stock);
    } catch (error) {
      OutputView.printError(error.message);
      await this.#createPosMachine();
    }
  }

  #validateOrderProcess(orders) {
    validateOrderInput(orders);
    parseOrderInput(orders).forEach(([name, quantity]) => {
      const hasProduct = this.#stock.hasProductNameInStock(name);
      const isExceedQuantity = this.#stock.canDecreaseQuantityInStock(name, quantity);
      validateOrderData(hasProduct, isExceedQuantity);
    });
  }

  async #checkOrderForPromotion() {
    const promotionExistProducts = this.#posMachine.checkOrderAboutPromotionProduct();
    const nonePromotionProduct = this.#posMachine.checkOrderAboutGeneralProduct();
    const result = [];
    for (let i = 0; i < promotionExistProducts.length; i += 1)
      await PromotionService.promotionInputSystem(promotionExistProducts[i], result);
    for (let i = 0; i < nonePromotionProduct.length; i += 1) result.push(nonePromotionProduct[i]);
    return result;
  }

  async #createReceipt(shoppingList) {
    const hasMembership = (await readAndValidateMembership()) === 'Y';
    this.#receipt = new Receipt(shoppingList, hasMembership);
  }

  displayRecipt() {
    OutputView.printOrders();
    OutputView.printPresent();
    OutputView.printCalculate();
  }
}

export default StoreController;
