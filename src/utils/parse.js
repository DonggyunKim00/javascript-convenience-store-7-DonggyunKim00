export const parseOrderInput = (orders) =>
  orders.split(',').map((item) => {
    const [name, quantity] = item.slice(1, -1).split('-');
    return [name, Number(quantity)];
  });

const getTextLength = (str) =>
  Array.from(str).reduce((len, char) => len + (char.charCodeAt(0) > 255 ? 2 : 1), 0);

export const formatWithPadding = (text, totalLength) =>
  text + ' '.repeat(totalLength - getTextLength(text));
