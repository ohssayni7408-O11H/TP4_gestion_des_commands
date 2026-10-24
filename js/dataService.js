async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Échec du chargement de ${path} :`, error);
    throw new Error(`Impossible de charger le fichier ${path}`);
  }
}

export async function loadAllData() {
  const [customers, products, orders] = await Promise.all([
    loadJSON("data/customers.json"),
    loadJSON("data/products.json"),
    loadJSON("data/orders.json")
  ]);
  return { customers, products, orders };
}