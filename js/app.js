import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { showError, hideError } from "./view.js";
import { getOrderView, getIndicators } from "./selectors.js";

async function init() {
  try {
    hideError();
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    console.log(getOrderView(state.orders[0], state.customers, state.products));
    console.log(getIndicators(state));
  } catch (error) {
    showError(error.message);
  }
}

init();