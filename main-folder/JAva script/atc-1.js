document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  updateCartCount(); // Show count on page load

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const productDiv = button.closest(".Productdetail");
      const quantitySelect = productDiv.querySelector(".quantity");
      const quantity = parseInt(quantitySelect.value);
      const itemId = button.dataset.id;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(p => p.id === itemId);

      if (existing) {
        existing.quantity = quantity;
      } else {
        const item = {
          id: itemId,
          name: button.dataset.name,
          price: parseFloat(button.dataset.price),
          image: button.dataset.image,
          quantity: quantity
        };
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount(); // Update badge
      alert(`${button.dataset.name} added to cart (x${quantity})`);
    });
  });
});