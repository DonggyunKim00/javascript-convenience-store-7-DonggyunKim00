import StoreController from './controller/StoreController.js';

class App {
  #storeController;

  constructor() {
    this.#storeController = new StoreController();
  }

  async run() {
    this.#storeController.init();
    this.#storeController.displayStoreStock();
    await this.#storeController.purchaseProcess();
  }
}

export default App;
