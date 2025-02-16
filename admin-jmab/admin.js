document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login-form");
    const loadingScreen = document.getElementById("loading-screen");

    // Login form submission

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevents default form submission

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            loadingScreen.style.display = "flex";

            console.log("Email: ", email);  // Check if email is correct
            console.log("Password: ", password); 

            // Check if fields are filled in
            if (!email || !password) {
                alert("Please fill in all required fields.");
                loadingScreen.style.display = "none";
                return;
            }

            // Prepare data to be sent to the PHP script
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            // Send POST request to PHP backend using fetch
            fetch('admin-jmab/login-admin.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Assuming the backend sends JSON responses
            .then(data => {
                loadingScreen.style.display = "none";

                if (data.success) {
                    window.location.href = "/admin-jmab/testing-admin.html"; // Redirect to admin page
                } else {
                    alert(data.message); // Display error message from PHP
                }
            })
            .catch(error => {
                loadingScreen.style.display = "none";
                alert("An error occurred during login. Please try again.");
            });
        });
    }
});

            // Check if the provided credentials match any in the valid list
            const user = validCredentials.find(cred => cred.email === email && cred.password === password);

            setTimeout(() => {
                // Hide the loading screen
                loadingScreen.style.display = "none";

                if (user) {
                    window.location.href = "/admin-jmab/testing-admin.html"; 
                } else {
                    alert("Invalid email or password!"); 
                }
            }, 1500); // 1.5 sec delay for loading screen
    
    // Logout confirmation
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();

        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            window.location.href = '/admin-jmab/signin-admin.html'; // Redirect to login page
        }
    });

    // Display products on page load
    displayProducts(); 

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
    products.splice(index, 1); // Remove the product at the specified index
    localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
    displayProducts(); // Re-display the products after deletion
}

// Function to toggle the Add Product form visibility
function toggleProductForm() {
    const form = document.getElementById('product-form');
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}

// Function to switch between sections in the admin panel
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
