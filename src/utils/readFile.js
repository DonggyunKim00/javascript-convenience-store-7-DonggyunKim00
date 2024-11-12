import fs from 'fs';

const readFile = (fileName) =>
  fs
    .readFileSync(`./public/${fileName}`, 'utf8')
    .split('\n')
    .slice(1)
    .filter((item) => item !== '')
    .map((item) => item.split(','));

export const readProductsFile = () => readFile('products.md');
export const readPromotionsFile = () => readFile('promotions.md');
