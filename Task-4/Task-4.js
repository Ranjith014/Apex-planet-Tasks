document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default jump-to-anchor behavior

        // Get the target element and scroll to it smoothly
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        { id: 1, name: 'Laptop', category: 'electronics', price: 1200, rating: 4.5 },
        { id: 2, name: 'T-Shirt', category: 'clothing', price: 25, rating: 4.0 },
        { id: 3, name: 'JavaScript Book', category: 'books', price: 40, rating: 4.8 },
        { id: 4, name: 'Headphones', category: 'electronics', price: 150, rating: 4.2 },
        { id: 5, name: 'Jeans', category: 'clothing', price: 60, rating: 4.3 },
        { id: 6, name: 'History Book', category: 'books', price: 30, rating: 4.6 },
        { id: 7, name: 'Smartphone', category: 'electronics', price: 800, rating: 4.7 },
        { id: 8, name: 'Sweater', category: 'clothing', price: 45, rating: 4.1 },
    ];

    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');

    // Function to display products
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = ''; // Clear the grid first
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="category">Category: ${product.category}</p>
                <p class="rating">Rating: ${product.rating} ★</p>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Function to apply filters and sorting
    function applyFiltersAndSort() {
        let filteredProducts = [...products]; // Start with a copy of all products

        // Apply category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        // Apply sorting
        const sortValue = sortBy.value;
        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'rating-desc') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        displayProducts(filteredProducts);
    }

    // Add event listeners to controls
    categoryFilter.addEventListener('change', applyFiltersAndSort);
    sortBy.addEventListener('change', applyFiltersAndSort);

    // Initial display of all products
    displayProducts(products);
});