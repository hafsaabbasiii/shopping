
const products = [
  {
    id: 1,
    name: "Sports Sneakers",
    category: "Fashion",
    price: 2499,
    image: "photo-1542291026-7eec264c27ff",
    alt: "Red and white sports sneakers"
  },
  {
    id: 2,
    name: "Travel Backpack",
    category: "Accessories",
    price: 1899,
    image: "photo-1553062407-98eeb64c6a62",
    alt: "Everyday travel backpack"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3299,
    image: "photo-1505740420928-5e560c06d30e",
    alt: "Wireless over-ear headphones"
  },
  {
    id: 4,
    name: "Classic Watch",
    category: "Accessories",
    price: 2799,
    image: "photo-1523275335684-37898b6baf30",
    alt: "Classic wristwatch"
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    category: "Fashion",
    price: 1499,
    image: "photo-1521572163474-6864f9cf17ab",
    alt: "Casual cotton t-shirt"
  },
  {
    id: 6,
    name: "Stylish Sunglasses",
    category: "Accessories",
    price: 999,
    image: "photo-1511499767150-a48a237f0083",
    alt: "Stylish sunglasses"
  },
  {
    id: 7,
    name: "Digital Camera",
    category: "Electronics",
    price: 12999,
    image: "photo-1516035069371-29a1b244cc32",
    alt: "Digital photography camera"
  },
  {
    id: 8,
    name: "Fashion Handbag",
    category: "Fashion",
    price: 2199,
    image: "photo-1584917865442-de89df76afd3",
    alt: "Fashion handbag"
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const message = document.getElementById("message");

function formatPrice(price) {
  return "Rs. " + price.toLocaleString("en-PK");
}

function renderProducts(items) {
  productGrid.replaceChildren();

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No products found. Try another search.";
    productGrid.appendChild(empty);
    return;
  }

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src =
      `https://images.unsplash.com/${product.image}` +
      "?auto=format&fit=crop&w=600&q=75";
    img.alt = product.alt;
    img.width = 600;
    img.height = 450;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "add-btn";
    button.type = "button";
    button.textContent = "Add to Cart";

    button.addEventListener("click", () => {
      addToCart(product);
    });

    info.append(category, title, price, button);
    card.append(img, info);
    productGrid.appendChild(card);
  });
}

function addToCart(product) {
  cart.push(product);
  cartCount.textContent = cart.length;

  message.textContent = `${product.name} added to cart!`;
  message.style.display = "block";

  clearTimeout(addToCart.timer);

  addToCart.timer = setTimeout(() => {
    message.style.display = "none";
  }, 2500);
}

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();

  const query = document.getElementById("searchInput")
    .value.trim().toLowerCase();

  const results = products.filter(product =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query)
  );

  renderProducts(results);
  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderProducts(products);
