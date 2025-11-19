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

// Platzhalter für später (Warenkorb)
function addToCart(index) {
    console.log("Gericht in Warenkorb legen:", dishes[index].name);
}

init();