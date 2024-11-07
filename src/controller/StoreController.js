import Stock from '../model/Stock.js';
import Product from '../model/Product.js';
import PromotionList from '../model/PromotionList.js';
import { readProductsFile, readPromotionsFile } from '../utils/readFile.js';
import OutputView from '../view/OutputView.js';

class StoreController {
  #promotionList;

  #stock;

  init() {
    this.#initCreatePromotionList();
    this.#initCreateStock();
    this.#displayStoreStock();
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

  #displayStoreStock() {
    OutputView.printIntro();

    this.#stock.getProductsInfo().forEach(({ name, price, quantity, promotion }) => {
      OutputView.printOneProduct(name, price.toLocaleString('ko-KR'), quantity, promotion);
    });
  }
}

export default StoreController;
