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