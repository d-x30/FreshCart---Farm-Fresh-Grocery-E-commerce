# FreshCart---Farm-Fresh-Grocery-E-commerce
FreshCart is a responsive, farm-to-table grocery e-commerce prototype. It features a functional shopping cart with real-time price updates, dynamic product filtering by category, and a live search bar. Built with Vanilla JS, HTML5, and CSS3, it also includes a complete SQL schema for managing users, products, and orders.

FreshCart - Farm-Fresh Grocery E-commerce
FreshCart is a front-end driven e-commerce platform designed for local grocery delivery. It features a responsive UI, dynamic product filtering, a functional shopping cart, and a pre-structured SQL database schema for backend integration.

🚀 Features
Product Filtering: Filter items by categories (Fruits, Vegetables, Dairy, Pantry) or search directly via the search bar.

Shopping Cart: Add/remove items with real-time price calculation and total updates.

Interactive Modals: Custom-built modals for the Shopping Cart and User Account (Login/Sign-up).

Daily Deals: Dedicated section to highlight discounted products with visual badges.

Responsive Design: Fully styled with CSS Flexbox for a seamless experience across devices.

Database Ready: Includes a robust SQL schema for products, users, orders, and categories.

🛠️ Tech Stack
Frontend: HTML5, CSS3, JavaScript (Vanilla)

Database: MySQL / MariaDB

Icons/Images: External high-quality assets via URL

📂 File Structure
index.html: The core structure of the marketplace.

style.css: Custom styling, including modal animations and grid layouts.

script.js: Logic for the cart, search functionality, and UI interactions.

s.sql: Database initialization script.

🗄️ Database Schema
The project includes an s.sql file to set up a relational database:

products: Stores name, price, unit, and stock levels.

categories: Organizes products for easier navigation.

users: Manages customer profiles and hashed credentials.

orders & order_items: Handles transaction history and itemized receipts.

🖥️ Getting Started
Clone the repository:

Bash
git clone https://github.com/your-username/freshcart.git
Open the App:
Simply open index.html in any modern web browser.

Setup Database (Optional):
Import s.sql into your local MySQL server to view the table structures.
