function formatMAD(amount) {
  return amount.toLocaleString("fr-FR") + " MAD";
}

export function showError(message) {
  const zone = document.getElementById("error-zone");
  zone.textContent = message;
  zone.classList.remove("d-none");
}

export function hideError() {
  const zone = document.getElementById("error-zone");
  zone.textContent = "";
  zone.classList.add("d-none");
}

export function renderIndicators(indicators) {
  const items = [
    { label: "Clients", value: indicators.customers },
    { label: "Produits", value: indicators.products },
    { label: "Commandes", value: indicators.orders },
    { label: "Montant cumulé", value: formatMAD(indicators.totalAmount) }
  ];

  document.getElementById("indicators").innerHTML = items
    .map(item => `
      <div class="col-6 col-md-3">
        <div class="card indicator-card p-3">
          <div class="indicator-value">${item.value}</div>
          <div class="indicator-label">${item.label}</div>
        </div>
      </div>`)
    .join("");
}

export function renderCategoryOptions(categories) {
  const select = document.getElementById("category-filter");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

function statusBadge(status) {
  const cls = "status-" + status.toLowerCase().replace(/ /g, "-");
  return `<span class="status-badge ${cls}">${status}</span>`;
}

export function renderOrders(orderViews) {
  const body = document.getElementById("orders-body");

  if (orderViews.length === 0) {
    body.innerHTML = `<tr><td colspan="6" class="empty-message">Aucune commande trouvée.</td></tr>`;
    return;
  }

  body.innerHTML = orderViews
    .map(order => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customerName}</td>
        <td>${order.date}</td>
        <td>${statusBadge(order.status)}</td>
        <td>${formatMAD(order.total)}</td>
        <td>
          <button class="btn btn-sm btn-primary" data-order-id="${order.id}">Détail</button>
        </td>
      </tr>`)
    .join("");
}

export function showOrderDetail(order) {
  document.getElementById("order-modal-title").textContent = `Commande #${order.id}`;

  const rows = order.lines
    .map(line => `
      <tr>
        <td>${line.name}</td>
        <td>${formatMAD(line.price)}</td>
        <td>${line.quantity}</td>
        <td>${formatMAD(line.amount)}</td>
      </tr>`)
    .join("");

  document.getElementById("order-modal-body").innerHTML = `
    <p class="mb-1"><strong>Client :</strong> ${order.customerName}</p>
    <p class="mb-1"><strong>Ville :</strong> ${order.city}</p>
    <p class="mb-1"><strong>Date :</strong> ${order.date}</p>
    <p class="mb-3"><strong>Statut :</strong> ${statusBadge(order.status)}</p>
    <table class="table table-sm">
      <thead>
        <tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Montant</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <h5 class="text-end">Total : ${formatMAD(order.total)}</h5>`;

  const modal = new bootstrap.Modal(document.getElementById("order-modal"));
  modal.show();
}