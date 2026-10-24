export function getCustomer(customers, customerId) {
  return customers.find(c => c.id === customerId);
}

export function getProduct(products, productId) {
  return products.find(p => p.id === productId);
}

export function getOrderLines(order, products) {
  return order.items.map(item => {
    const product = getProduct(products, item.productId);
    const price = product ? product.price : 0;
    return {
      productId: item.productId,
      name: product ? product.name : "Produit inconnu",
      category: product ? product.category : "",
      price: price,
      quantity: item.quantity,
      amount: price * item.quantity
    };
  });
}

export function getOrderTotal(order, products) {
  let total = 0;
  getOrderLines(order, products).forEach(line => {
    total += line.amount;
  });
  return total;
}

export function getOrderView(order, customers, products) {
  const customer = getCustomer(customers, order.customerId);
  return {
    id: order.id,
    customerName: customer ? customer.name : "Client inconnu",
    city: customer ? customer.city : "",
    date: order.date,
    status: order.status,
    lines: getOrderLines(order, products),
    total: getOrderTotal(order, products)
  };
}

export function getIndicators(state) {
  let totalAmount = 0;
  state.orders.forEach(order => {
    totalAmount += getOrderTotal(order, state.products);
  });
  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    totalAmount: totalAmount
  };
}