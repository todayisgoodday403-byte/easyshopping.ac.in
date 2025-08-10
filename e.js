// Sample product data
const products = [{
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://via.placeholder.com/300x300?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch with Fitness Tracker",
        price: 129.99,
        originalPrice: 149.99,
        image: "https://via.placeholder.com/300x300?text=Smart+Watch"
    },
    {
        id: 3,
        name: "4K Ultra HD Smart TV",
        price: 599.99,
        originalPrice: 699.99,
        image: "https://via.placeholder.com/300x300?text=Smart+TV"
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 24.99,
        originalPrice: 29.99,
        image: "https://via.placeholder.com/300x300?text=Charging+Pad"
    },
    {
        id: 5,
        name: "Laptop Backpack",
        price: 39.99,
        originalPrice: 49.99,
        image: "https://via.placeholder.com/300x300?text=Backpack"
    },
    {
        id: 6,
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        originalPrice: 24.99,
        image: "https://via.placeholder.com/300x300?text=Water+Bottle"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://via.placeholder.com/300x300?text=Speaker"
    },
    {
        id: 8,
        name: "Wireless Mouse",
        price: 29.99,
        originalPrice: 34.99,
        image: "https://via.placeholder.com/300x300?text=Mouse"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsContainer = document.querySelector('.products');
const cartCountElement = document.querySelector('.cart-count');

// Display products
function displayProducts() {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? <span class="original-price">$${product.originalPrice.toFixed(2)}</span> : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showAddedToCartMessage(product.name);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Show "Added to cart" message
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'cart-message';


    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('show');
    }, 10);

    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Add styles for cart message
    const style = document.createElement('style');
    style.textContent = `
        .cart-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        
        .cart-message.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});