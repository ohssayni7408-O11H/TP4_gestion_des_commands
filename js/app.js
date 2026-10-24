import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { showError, hideError } from "./view.js";

async function init() {
  try {
    hideError();
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;
    console.log("State chargé :", state);
    // Le premier render() sera ajouté au commit 4
  } catch (error) {
    showError(error.message);
  }
}

init();