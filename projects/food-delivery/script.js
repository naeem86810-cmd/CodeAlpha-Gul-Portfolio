let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const cartTotalItems = document.getElementById("cartTotalItems");
    const checkoutBtn = document.getElementById("checkoutBtn");

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutBtn.disabled = true;
    } else {
        cart.forEach((item, index) => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price} × ${item.quantity}</p>

                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${index})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>

                <strong>
                    Rs. ${item.price * item.quantity}
                </strong>
            `;

            cartItems.appendChild(div);
        });

        checkoutBtn.disabled = false;
    }

    cartCount.textContent = totalItems;
    cartTotalItems.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function scrollToCart() {
    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
}

function filterFood(category) {
    const foods = document.querySelectorAll(".food-card");
    const buttons = document.querySelectorAll(".categories button");

    buttons.forEach(button => {
        button.classList.remove("active-category");
    });

    event.target.classList.add("active-category");

    let found = false;

    foods.forEach(food => {
        if (
            category === "all" ||
            food.dataset.category === category
        ) {
            food.style.display = "block";
            found = true;
        } else {
            food.style.display = "none";
        }
    });

    document.getElementById("noFood").style.display =
        found ? "none" : "block";
}

function searchFood() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const foods = document.querySelectorAll(".food-card");

    let found = false;

    foods.forEach(food => {
        const name = food.dataset.name.toLowerCase();

        if (name.includes(searchText)) {
            food.style.display = "block";
            found = true;
        } else {
            food.style.display = "none";
        }
    });

    document.getElementById("noFood").style.display =
        found ? "none" : "block";
}

document
    .getElementById("checkoutBtn")
    .addEventListener("click", function () {

        alert(
            "Thank you for your order! 🍔\n\nYour order has been placed successfully."
        );

        cart = [];

        updateCart();
    });

updateCart();