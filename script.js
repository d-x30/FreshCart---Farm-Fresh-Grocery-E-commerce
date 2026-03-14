document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const accountModal = document.getElementById('account-modal');
    const cartModal = document.getElementById('cart-modal');

    const accountLink = document.getElementById('account-link');
    const cartLink = document.getElementById('cart-link');

    const closeBtns = document.querySelectorAll('.close-btn');

    accountLink.onclick = () => accountModal.style.display = 'block';
    cartLink.onclick = () => cartModal.style.display = 'block';

    closeBtns.forEach(btn => {
        btn.onclick = () => {
            accountModal.style.display = 'none';
            cartModal.style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target == accountModal || event.target == cartModal) {
            accountModal.style.display = 'none';
            cartModal.style.display = 'none';
        }
    };

    // Shopping Cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartLinkText = document.getElementById('cart-link');

    let cart = [];
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const name = productCard.querySelector('h3').innerText;
            const priceString = productCard.querySelector('p').innerText;
            const price = parseFloat(priceString.replace('₹', '').split(' ')[0]);

            // Add item to cart array
            cart.push({ name, price });

            // Update total
            total += price;

            // Update UI
            updateCartUI();
        });
    });

    function updateCartUI() {
        // Update cart link text
        cartLinkText.innerText = `Cart (${cart.length})`;

        // Clear previous items
        cartItemsContainer.innerHTML = '';

        // Add new items
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>
                    ₹${item.price.toFixed(2)}
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </span>`;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update total price
        cartTotalElement.innerText = `₹${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            removeFromCart(index);
        }
    });

    function removeFromCart(index) {
        // Subtract price from total
        total -= cart[index].price;
        // Remove item from cart array
        cart.splice(index, 1);
        // Update the UI
        updateCartUI();
    }

    // Buy Now functionality
    const buyNowBtn = document.getElementById('buy-now-btn');
    buyNowBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Thank you for your purchase!');

        // Clear cart
        cart = [];
        total = 0;
        updateCartUI();

        // Close the modal
        cartModal.style.display = 'none';
    });

    // Account modal tab switching
    const accountTabs = document.querySelector('.account-tabs');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    accountTabs.addEventListener('click', (e) => {
        const tab = e.target.dataset.tab;
        if (!tab) return;

        tabLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.tab === tab) {
                link.classList.add('active');
            }
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tab) {
                content.classList.add('active');
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const productCards = document.querySelectorAll('.product-card');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').innerText.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = ''; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // If 'Deals' is clicked, filter for deals
            if (targetId === '#deals') {
                // Update active category card
                categoryCards.forEach(card => card.classList.remove('active'));

                productCards.forEach(card => {
                    if (card.dataset.deal === 'true') {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // Category filtering
    const categoryGrid = document.querySelector('.category-grid');
    const categoryCards = document.querySelectorAll('.category-card');

    categoryGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-card')) {
            const category = e.target.dataset.category;

            // Update active category card
            categoryCards.forEach(card => card.classList.remove('active'));
            e.target.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
});
