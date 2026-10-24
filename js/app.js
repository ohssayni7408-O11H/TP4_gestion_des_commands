import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import {
  showError, hideError, renderIndicators,
  renderCategoryOptions, renderOrders, showOrderDetail
} from "./view.js";
import {
  getOrderView, getIndicators, getCategories, filterOrders
} from "./selectors.js";

function render() {
  renderIndicators(getIndicators(state));

  const orderViews = filterOrders(state).map(order =>
    getOrderView(order, state.customers, state.products)
  );
  renderOrders(orderViews);
}

function setupEvents() {
  document.getElementById("search-input").addEventListener("input", e => {
    state.search = e.target.value;
    render();
  });

  document.getElementById("status-filter").addEventListener("change", e => {
    state.status = e.target.value;
    render();
  });

  document.getElementById("category-filter").addEventListener("change", e => {
    state.category = e.target.value;
    render();
  });

  document.getElementById("orders-body").addEventListener("click", e => {
    const button = e.target.closest("button[data-order-id]");
    if (!button) return;

    const id = Number(button.dataset.orderId);
    const order = state.orders.find(o => o.id === id);
    if (order) {
      showOrderDetail(getOrderView(order, state.customers, state.products));
    }
  });
}

async function init() {
  try {
    hideError();
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderCategoryOptions(getCategories(state.products));
    setupEvents();
    render();
  } catch (error) {
    showError(error.message);
  }
}

init();