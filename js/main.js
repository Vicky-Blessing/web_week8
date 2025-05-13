// Sample product data
const products = [
  {
    id: 1,
    name: "Urban Runner Pro",
    price: 129.99,
    image: "UrbanPro.jpeg"
  },
  {
    id: 2,
    name: "Street Style Max",
    price: 149.99,
    image: "street_style.jpeg"
  },
  {
    id: 3,
    name: "Comfort Elite",
    price: 99.99,
    image: "DrMartens.jpeg"
  }
];

// Sample reviews
const reviews = [
  {
    name: "Alex",
    text: "Best shoes I've ever owned! The comfort is unreal.",
    rating: 5
  },
  {
    name: "Sarah",
    text: "Stylish and durable. Worth every penny!",
    rating: 4
  },
  {
    name: "Mike",
    text: "Great customer service and fast shipping.",
    rating: 5
  }
];

// Cart functionality
let cart = [];
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark', isDarkMode);
  themeToggle.textContent = isDarkMode ? '🌞' : '🌓';
});

// Initialize products with fade-in animation
const productContainer = document.getElementById('product-container');
products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.className = 'product-card fade-in';
  
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">$${product.price}</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  productContainer.appendChild(productCard);
});

// Initialize reviews carousel
const reviewWrapper = document.getElementById('review-wrapper');
const prevBtn = document.querySelector('.review-nav.prev');
const nextBtn = document.querySelector('.review-nav.next');
const dotsContainer = document.querySelector('.review-dots');
let currentSlide = 0;

// Create review slides
reviews.forEach((review, index) => {
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';
  reviewCard.innerHTML = `
    <h3>${review.name}</h3>
    <p>${review.text}</p>
    <div class="rating">${'⭐'.repeat(review.rating)}</div>
  `;
  reviewWrapper.appendChild(reviewCard);

  // Create dots
  const dot = document.createElement('span');
  dot.className = 'dot';
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

// Carousel navigation
function updateSlidePosition() {
  reviewWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlidePosition();
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + reviews.length) % reviews.length;
  updateSlidePosition();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % reviews.length;
  updateSlidePosition();
});

// Auto-advance carousel
setInterval(() => {
  currentSlide = (currentSlide + 1) % reviews.length;
  updateSlidePosition();
}, 5000);

// Cart functions
window.addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
};

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" width="50">
      <span>${item.name}</span>
      <span>$${item.price}</span>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);
}

cartBtn.addEventListener('click', () => {
  cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

// Simple checkout function
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your purchase! This is a demo site.');
  cart = [];
  updateCart();
  cartModal.classList.remove('active');
});

// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with: ${email}`);
  e.target.reset();
});

