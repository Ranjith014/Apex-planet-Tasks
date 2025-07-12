document.addEventListener('DOMContentLoaded', () => {
    // Mock product data (in a real application, this would come from a server/API)
    const products = [
        { id: 1, name: 'Cool Gadget', price: 29.99, image: 'https://thegadgetflow.com/wp-content/uploads/2019/09/Air-Unleashed-Wireless-Charging-Mat-03-1.jpg'},
        { id: 2, name: 'Awesome Widget', price: 49.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWq9bJ1HSgz-o_5Lgf4v9oLBn5Pk136-EZQ&s'},
        { id: 3, name: 'Fancy Thing', price: 99.99, image: 'https://www.annaijewellers.com/wp-content/uploads/2019/02/Fancy-Gift-7-2.jpg'},
        { id: 4, name: 'Super Gear', price: 19.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCIPUb6JLx7iWBI2c6SgsdNc8bYPvz6_8qQ&s' }  ];

    const productGrid = document.getElementById('product-grid');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById('cart-modal');
    const closeButton = document.getElementsByClassName('close-button')[0];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    // 1. Display Products
    function displayProducts() {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
    }

    // 2. Add to Cart
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }
    });

    // 3. Update Cart Display
    function updateCart() {
        renderCartItems();
        renderCartTotal();
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // 4. Render Cart Items
    function renderCartItems() {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
    }

    // 5. Calculate and Render Cart Total
    function renderCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // 6. Remove item from cart
    cartItemsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
    });

    // Modal functionality
    cartIcon.onclick = () => {
        modal.style.display = "block";
    }

    closeButton.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Initial load
    displayProducts();
});