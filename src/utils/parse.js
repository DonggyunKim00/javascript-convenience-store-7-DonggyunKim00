export const parseOrderInput = (orders) =>
  orders.split(',').map((item) => {
    const [name, quantity] = item.slice(1, -1).split('-');
    return [name, Number(quantity)];
  });
