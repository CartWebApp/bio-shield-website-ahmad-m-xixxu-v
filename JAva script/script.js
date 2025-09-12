const products = [
    { id: 1, name: "Bug Spray", price: 4.99 },
    { id: 2, name: "Bug Repelient", price: 15.99 },
    { id: 3, name: "Fly Traps", price: 6.99 },
    { id: 4, name: "Sticky Tape", price: 3.99 }
  ];

const productsDiv = document.getElementById("products");

function renderProducts() {
  productsDiv.innerHTML = ""; // clear existing
  products.forEach(product => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `
      <strong>${product.name}</strong> - $${product.price.toFixed(2)}
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(productEl);
  });
}

renderProducts();

let cart = [];

function addToCart(productId) {
  // Check if product already in cart
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  renderCart();
}

const cartDiv = document.getElementById("cart");
const totalEl = document.getElementById("total");

function renderCart() {
  cartDiv.innerHTML = "";
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    const itemTotal = product.price * cartItem.quantity;
    total += itemTotal;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.innerHTML = `
      ${product.name} - $${product.price.toFixed(2)} x ${cartItem.quantity} = $${itemTotal.toFixed(2)}
      <button onclick="increaseQuantity(${cartItem.id})">+</button>
      <button onclick="decreaseQuantity(${cartItem.id})">-</button>
      <button onclick="removeItem(${cartItem.id})">Remove</button>
    `;

    cartDiv.appendChild(cartItemEl);
  });
  
  totalEl.textContent = `Total: $${total.toFixed(2)}`;}

  function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity += 1;
      renderCart();
    }
  }
  
  function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
      }
      renderCart();
    }
  }
  
  function removeItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    renderCart();
  }

  function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = totalQuantity;
  }
  
  // Call updateCartCount every time cart changes
  function renderCart() {
    // ...existing renderCart code...
  
    updateCartCount();
  }