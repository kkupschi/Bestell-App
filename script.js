let cart = [];

function init() {
    renderDishList();
}

function renderDishList() {
    let dishListElement = document.getElementById("dishList");
    dishListElement.innerHTML = "";

    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        dishListElement.innerHTML += createDishHtml(dish, i);
    }
}

function createDishHtml(dish, index) {
    return /*html*/ `
    <div class="dish-card">
      <div class="dish-name">${dish.name}</div>
      <div class="dish-description">${dish.description}</div>
      <div class="dish-footer">
        <span class="dish-price">${formatPrice(dish.price)}</span>
        <button class="add-btn" onclick="addToCart(${index})">+</button>
      </div>
    </div>
  `;
}

// Warenkorb
function addToCart(dishIndex) {
    let existingIndex = findCartItemIndex(dishIndex);

    if (existingIndex === -1) {
        cart.push({ dishIndex: dishIndex, amount: 1 });
    } else {
        cart[existingIndex].amount++;
    }

    renderCart();
}

function findCartItemIndex(dishIndex) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].dishIndex === dishIndex) {
            return i;
        }
    }

    return -1;
}

function increaseAmount(cartIndex) {
    cart[cartIndex].amount++;
    renderCart();
}

function decreaseAmount(cartIndex) {
    cart[cartIndex].amount--;

    if (cart[cartIndex].amount <= 0) {
        deleteCartItem(cartIndex);
    } else {
        renderCart();
    }
}

function deleteCartItem(cartIndex) {
    cart.splice(cartIndex, 1);
    renderCart();
}

function renderCart() {
    let cartListElement = document.getElementById("cartList");
    let cartTotalElement = document.getElementById("cartTotal");

    if (cart.length === 0) {
        cartListElement.innerHTML = "Noch keine Gerichte im Warenkorb.";
        cartTotalElement.innerHTML = "";
        return;
    }

    cartListElement.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        cartListElement.innerHTML += createCartItemHtml(cart[i], i);
    }

    let subtotal = calculateCartTotal();
    let shipping = subtotal > 0 ? 5 : 0;
    let finalTotal = subtotal + shipping;

    cartTotalElement.innerHTML = createCartSummaryHtml(subtotal, shipping, finalTotal);
}

function createCartSummaryHtml(subtotal, shipping, finalTotal) {
    return /*html*/ `
    <div class="cart-summary-row">
      <span>Zwischensumme</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="cart-summary-row">
      <span>Lieferkosten</span>
      <span>${formatPrice(shipping)}</span>
    </div>
    <div class="cart-summary-row total">
      <span>Gesamt</span>
      <span>${formatPrice(finalTotal)}</span>
    </div>
  `;
}

function createCartItemHtml(cartItem, index) {
    let dish = dishes[cartItem.dishIndex];
    let lineTotal = dish.price * cartItem.amount;

    return /*html*/ `
    <div class="cart-item">

      <!-- Zeile 1: Name + Delete -->
      <div class="cart-item-row top-row">
        <span class="cart-item-name">${dish.name}</span>

        <button class="cart-btn delete" onclick="deleteCartItem(${index})">🗑</button>
      </div>

      <!-- Zeile 2: - 4x + und Preis rechts -->
      <div class="cart-item-row bottom-row">
        <div class="cart-controls">
          <button class="cart-btn small" onclick="decreaseAmount(${index})">−</button>
          <span class="cart-item-amount">${cartItem.amount}x</span>
          <button class="cart-btn small" onclick="increaseAmount(${index})">+</button>
        </div>

        <div class="cart-item-price">
          ${formatPrice(lineTotal)}
        </div>
      </div>

    </div>
  `;
}

function calculateCartTotal() {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let dish = dishes[item.dishIndex];
        sum += dish.price * item.amount;
    }

    return sum;
}

function formatPrice(value) {
    let fixed = value.toFixed(2);
    return fixed.replace(".", ",") + "€";
}

function init() {
    renderDishList();
    renderCart();
}

init();