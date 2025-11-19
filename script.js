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
        <span class="dish-price">${dish.price.toFixed(2)} €</span>
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

    let total = calculateCartTotal();
    cartTotalElement.innerHTML = "Gesamt: " + total.toFixed(2) + " €";
}

function createCartItemHtml(cartItem, index) {
    let dish = dishes[cartItem.dishIndex];
    let lineTotal = dish.price * cartItem.amount;

    return /*html*/ `
    <div class="cart-item">
      <div class="cart-item-left">
        <span class="cart-item-name">${dish.name}</span>
        <span class="cart-item-amount">${cartItem.amount}x</span>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${lineTotal.toFixed(2)} €</span>
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

function init() {
    renderDishList();
    renderCart();
}

init();