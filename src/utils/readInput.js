import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { validateYorN } from './validate.js';

const recursionInput = async (readInput, validationFn) => {
  try {
    const input = await readInput();
    validationFn(input);
    return input;
  } catch (error) {
    OutputView.printError(error.message);
    return recursionInput(readInput, validationFn);
  }
};

export const readAndValidateFreeAddition = (name) =>
  recursionInput(() => InputView.readFreeAdditionConfirmation(name), validateYorN);

export const readAndValidatePurchase = (name, amount) =>
  recursionInput(() => InputView.readPurchaseConfirmation(name, amount), validateYorN);

export const readAndValidateMembership = () =>
  recursionInput(() => InputView.readMembershipConfirmation(), validateYorN);

export const readAndValidateShopping = () =>
  recursionInput(() => InputView.readContinueShopping(), validateYorN);
