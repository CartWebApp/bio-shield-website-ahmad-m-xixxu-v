document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  const purchaseBtn = document.getElementById("purchase-btn");

  if (!cartContainer || !totalDisplay || !purchaseBtn) {
    console.error("Missing required DOM elements");
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
      total += item.price * item.quantity;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <div class="item-actions">
          <p>Quantity: ${item.quantity}</p>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(itemDiv);
    });

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  }

  cartContainer.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.dataset.id;
      cartItems = cartItems.filter(i => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  });

  purchaseBtn.addEventListener("click", () => {
    alert("Purchase complete!");
    localStorage.removeItem("cart");
    cartItems = [];
    renderCart();
  });

  renderCart();
});