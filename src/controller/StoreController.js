import Stock from '../model/Stock.js';
import Product from '../model/Product.js';
import PromotionList from '../model/PromotionList.js';
import { readProductsFile, readPromotionsFile } from '../utils/readFile.js';
import OutputView from '../view/OutputView.js';
import InputView from '../view/InputView.js';
import { validateOrderInput, validateOrderData } from '../utils/validate.js';
import PosMachine from '../model/PosMachine.js';
import { parseOrderInput } from '../utils/parse.js';

class StoreController {
  #promotionList;

  #stock;

  #posMachine;

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
    this.displayRecipt();
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

  displayRecipt() {
    OutputView.printOrders(this.#posMachine.getOrderInfo());
    OutputView.printPresent();
    OutputView.printCalculate();
  }
}

export default StoreController;
