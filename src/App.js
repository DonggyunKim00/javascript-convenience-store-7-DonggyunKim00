import StoreController from './controller/StoreController.js';
import { readAndValidateShopping } from './utils/readInput.js';
import OutputView from './view/OutputView.js';

class App {
  #storeController;

  constructor() {
    this.#storeController = new StoreController();
  }

  async run() {
    this.#storeController.init();
    await this.#controllerPlay();
  }

  async #controllerPlay() {
    while (true) {
      await this.#storeController.play();
      const input = await readAndValidateShopping();
      if (input === 'Y') OutputView.printBlankLine();
      if (input === 'N') break;
    }
  }
}

export default App;
