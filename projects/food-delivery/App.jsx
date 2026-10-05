import { useState, useEffect } from "react";
import "./App.css";

const foods = [
  { id: 1, name: "Zinger Burger", category: "Burgers", price: 450 },
  { id: 2, name: "Chicken Burger", category: "Burgers", price: 350 },
  { id: 3, name: "Beef Burger", category: "Burgers", price: 500 },

  { id: 4, name: "Chicken Pizza", category: "Pizza", price: 1200 },
  { id: 5, name: "Cheese Pizza", category: "Pizza", price: 1000 },
  { id: 6, name: "Pepperoni Pizza", category: "Pizza", price: 1400 },

  { id: 7, name: "Chicken Biryani", category: "Biryani", price: 300 },
  { id: 8, name: "Beef Biryani", category: "Biryani", price: 350 },
  { id: 9, name: "Mutton Biryani", category: "Biryani", price: 500 },

  { id: 10, name: "Chicken Tikka", category: "BBQ", price: 550 },
  { id: 11, name: "Seekh Kebab", category: "BBQ", price: 500 },
  { id: 12, name: "Malai Boti", category: "BBQ", price: 650 },

  { id: 13, name: "Chicken Shawarma", category: "Shawarma", price: 300 },
  { id: 14, name: "Zinger Shawarma", category: "Shawarma", price: 400 },

  { id: 15, name: "Chicken Roll", category: "Rolls", price: 250 },
  { id: 16, name: "Beef Roll", category: "Rolls", price: 300 },

  { id: 17, name: "French Fries", category: "Fries", price: 200 },
  { id: 18, name: "Loaded Fries", category: "Fries", price: 350 },

  { id: 19, name: "Chicken Pasta", category: "Pasta", price: 550 },
  { id: 20, name: "Alfredo Pasta", category: "Pasta", price: 650 },

  { id: 21, name: "Chicken Sandwich", category: "Sandwiches", price: 350 },
  { id: 22, name: "Club Sandwich", category: "Sandwiches", price: 500 },

  { id: 23, name: "Chicken Chow Mein", category: "Chinese", price: 550 },
  { id: 24, name: "Chicken Fried Rice", category: "Chinese", price: 500 },

  { id: 25, name: "Chicken Nuggets", category: "Snacks", price: 300 },
  { id: 26, name: "Chicken Wings", category: "Snacks", price: 450 },

  { id: 27, name: "Chocolate Cake", category: "Desserts", price: 400 },
  { id: 28, name: "Brownie", category: "Desserts", price: 300 },

  { id: 29, name: "Cold Drink", category: "Drinks", price: 120 },
  { id: 30, name: "Fresh Juice", category: "Drinks", price: 250 },

  { id: 31, name: "Halwa Puri", category: "Breakfast", price: 350 },
  { id: 32, name: "Anda Paratha", category: "Breakfast", price: 250 },

  { id: 33, name: "Chicken Wrap", category: "Wraps", price: 400 },
  { id: 34, name: "Zinger Wrap", category: "Wraps", price: 450 },

  { id: 35, name: "Family Deal", category: "Deals", price: 2200 },
  { id: 36, name: "Burger Deal", category: "Deals", price: 900 },
];

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Biryani",
  "BBQ",
  "Shawarma",
  "Rolls",
  "Fries",
  "Pasta",
  "Sandwiches",
  "Chinese",
  "Snacks",
  "Desserts",
  "Drinks",
  "Breakfast",
  "Wraps",
  "Deals",
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("foodieUser");

    if (savedUser) {
      setUserName(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const searchMatch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (food) => {
    setCart((oldCart) => {
      const existingItem = oldCart.find(
        (item) => item.id === food.id
      );

      if (existingItem) {
        return oldCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...oldCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const toggleFavorite = (id) => {
    setFavorites((oldFavorites) =>
      oldFavorites.includes(id)
        ? oldFavorites.filter((favoriteId) => favoriteId !== id)
        : [...oldFavorites, id]
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = email.split("@")[0];

    setUserName(name);
    setIsLoggedIn(true);

    localStorage.setItem("foodieUser", name);

    setShowLogin(false);
  };

  const logout = () => {
    localStorage.removeItem("foodieUser");
    setUserName("");
    setIsLoggedIn(false);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          🍔 <span>Foodie<span>Express</span></span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#deals">Deals</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-right">

          <button className="cart-button">
            🛒 Cart
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>

          <button
            className="login-button"
            onClick={() => setShowLogin(true)}
          >
            👤 {isLoggedIn ? userName : "Login"}
          </button>

          {isLoggedIn && (
            <button
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          )}

        </div>
      </header>


      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="small-title">
            FAST & DELICIOUS
          </p>

          <h1>
            Delicious Food,
            <br />
            <span>Delivered Fast.</span>
          </h1>

          <p className="hero-text">
            Order your favorite meals from the best restaurants
            and get them delivered right to your doorstep.
          </p>

          <a
            href="#menu"
            className="hero-button"
          >
            Order Now →
          </a>

        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
            alt="Delicious food"
          />
        </div>

      </section>


      {/* CATEGORIES */}
      <section className="category-section">

        <h2>Explore Categories</h2>

        <div className="categories">

          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "active-category"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}

        </div>

      </section>


      {/* MENU */}
      <section
        className="food-section"
        id="menu"
      >

        <div className="section-heading">

          <div>
            <p className="small-title">
              OUR MENU
            </p>

            <h2>
              Popular Food
            </h2>
          </div>

          <input
            type="text"
            placeholder="🔍 Search food..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="food-grid">

          {filteredFoods.map((food) => (

            <div
              className="food-card"
              key={food.id}
            >

              <img
                className="food-image"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt={food.name}
              />

              <div className="food-info">

                <span className="food-category">
                  {food.category}
                </span>

                <h3>
                  {food.name}
                </h3>

                <div className="food-rating">
                  ⭐ 4.5
                </div>

                <button
                  className="favorite-btn"
                  onClick={() =>
                    toggleFavorite(food.id)
                  }
                >
                  {favorites.includes(food.id)
                    ? "❤️ Favorite"
                    : "🤍 Favorite"}
                </button>

                <div className="food-bottom">

                  <strong>
                    Rs. {food.price}
                  </strong>

                  <button
                    className="add-cart"
                    onClick={() =>
                      addToCart(food)
                    }
                  >
                    + Add
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {filteredFoods.length === 0 && (
          <div className="no-food">
            <h3>
              No food found 😔
            </h3>

            <p>
              Try another search or category.
            </p>
          </div>
        )}

      </section>


      {/* DEALS */}
      <section
        className="deals-section"
        id="deals"
      >

        <p className="small-title">
          SPECIAL OFFERS
        </p>

        <h2>
          Today's Best Deals 🔥
        </h2>

        <div className="deal-grid">

          <div className="deal-card">

            <div>
              <span>
                BEST SELLER
              </span>

              <h3>
                Burger Combo
              </h3>

              <p>
                Burger + Fries + Drink
              </p>

              <strong>
                Rs. 699
              </strong>
            </div>

            <div className="deal-emoji">
              🍔
            </div>

          </div>


          <div className="deal-card">

            <div>
              <span>
                FAMILY DEAL
              </span>

              <h3>
                Family Feast
              </h3>

              <p>
                2 Pizzas + 4 Drinks
              </p>

              <strong>
                Rs. 2,499
              </strong>
            </div>

            <div className="deal-emoji">
              🍕
            </div>

          </div>

        </div>

      </section>


      {/* CART */}
      <section className="cart-section">

        <div className="cart-box">

          <div>

            <h2>
              Your Cart 🛒
            </h2>

            {cart.length === 0 ? (

              <p>
                Your cart is empty.
              </p>

            ) : (

              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Rs. {item.price}
                      </p>

                    </div>


                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                      >
                        +
                      </button>

                    </div>


                    <strong>
                      Rs.{" "}
                      {item.price *
                        item.quantity}
                    </strong>

                  </div>

                ))}

              </div>

            )}

          </div>


          <div className="cart-summary">

            <p>
              {cartCount} items
            </p>

            <h3>
              Total: Rs. {total}
            </h3>

            <button
              className="checkout-btn"
              disabled={cart.length === 0}
            >
              Checkout
            </button>

          </div>

        </div>

      </section>


      {/* LOGIN */}
      {showLogin && (

        <div className="login-overlay">

          <div className="google-login-box">

            <button
              className="close-login"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ✕
            </button>

            <div className="google-logo">
              G
            </div>

            <h2>
              Sign in
            </h2>

            <p className="google-welcome">
              Use your FoodieExpress account
            </p>

            <form
              onSubmit={handleLogin}
            >

              <input
                name="email"
                type="email"
                placeholder="Email or phone"
                required
              />

              <button
                type="submit"
                className="google-next"
              >
                Next
              </button>

            </form>


            <button
              className="google-account"
              onClick={() => {

                const name =
                  "FoodieExpress User";

                setUserName(name);
                setIsLoggedIn(true);

                localStorage.setItem(
                  "foodieUser",
                  name
                );

                setShowLogin(false);

              }}
            >
              👤 Continue with Google
            </button>


            <p className="google-footer">
              Not your computer? Use Guest mode
              to sign in privately.
            </p>

          </div>

        </div>

      )}


      {/* FOOTER */}
      <footer id="about">

        <div className="footer-logo">
          🍔 FoodieExpress
        </div>

        <p>
          Delicious food delivered fast to
          your doorstep.
        </p>

        <p className="copyright">
          © 2026 FoodieExpress. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;