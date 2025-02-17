document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");

    // Logout confirmation
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();

        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            window.location.href = '../J-Mab/HTML/sign-in.php'; // Redirect to login page
        }
    });

    // Display products on page load
    displayProducts();
});

// Function to display locally stored products in LocalStorage
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const sections = {
        tires: document.querySelector('.tire-section'),
        batteries: document.querySelector('.Battery-section'),
        lubricants: document.querySelector('.Lubricant-section'),
        oil: document.querySelector('.Oil-section')
    };

    // Clear previous content
    Object.values(sections).forEach(section => section.innerHTML = '');

    products.forEach((product, index) => {
        const section = sections[product.category];
        if (section) {
            const productItem = document.createElement('div');
            productItem.classList.add('item-container');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="100">
                <p>${product.name}</p>
                <h4>₱${product.price}</h4>
                <button onclick="deleteProduct(${index})" style="margin-top: 10px;">Remove</button>
            `;
            section.appendChild(productItem);
        }
    });
}

// Function to add a product to LocalStorage and display it
function addProduct() {
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const image = document.getElementById('product-image').value.trim();
    const category = document.getElementById('product-category').value;

    if (!name || !price || !image || !category) {
        alert("Please fill in all fields.");
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, price, image, category });
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts(); // Update the displayed list after adding a product

    // Hide form and reset fields
    document.getElementById('product-form').style.display = 'none';
    resetProductForm(); // Reset the form after adding the product
}

// Function to reset the Add Product form
function resetProductForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-category').value = 'tires';
}

// Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); 
    localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
    displayProducts(); // Re-display the products after deletion
}

// Function to toggle the Add Product form visibility
function toggleProductForm() {
    const form = document.getElementById('product-form');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}

// Function to switch sections in the admin panel
function showSection(sectionId, element) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('.side-menu a').forEach(link => {
        link.classList.remove('active');
    });

    element.classList.add('active');
    fetchProducts(); // Ensure products update when switching sections
}

// Function to cancel adding a product and hide the form
function cancelAddProduct() {
    document.getElementById('product-form').style.display = 'none';
}

// Fetch customer data from the server
fetch('/JMAB/admin-jmab/fetch_customer.php')
.then(response => response.json())
.then(data => {
    const tableBody = document.querySelector('#customers-table tbody');

    // Clear any existing rows
    tableBody.innerHTML = '';

    // Add a row for each customer
    data.forEach(customer => {
        const row = document.createElement('tr');
        
        //ADD  <td>${customer.id}</td> if u need ID//
        row.innerHTML = `
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <td>${customer.email}</td>
            <td>${customer.password}</td>
        `;

        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.error('Error fetching customer data:', error);
});

