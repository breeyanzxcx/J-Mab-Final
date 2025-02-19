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

function showAddProductForm() {
    document.getElementById('addProductButton').style.display = 'none'; // Hide the Add Product button
    document.getElementById('addProductForm').style.display = 'block'; // Show the product form
}

// Function to show dynamic fields based on selected category
function showFields() {
    const category = document.getElementById('category').value;

    // Hide all dynamic fields initially
    document.getElementById('tireFields').style.display = 'none';
    document.getElementById('lubricantOilFields').style.display = 'none';
    document.getElementById('batteryFields').style.display = 'none';

    // Show fields based on selected category
    if (category === 'tire') {
        document.getElementById('tireFields').style.display = 'block';
    } else if (category === 'lubricant' || category === 'oil') {
        document.getElementById('lubricantOilFields').style.display = 'block';
    } else if (category === 'battery') {
        document.getElementById('batteryFields').style.display = 'block';
    }
}

// Function to reset the form when Cancel is clicked
function cancelForm() {
    document.getElementById('addProductForm').style.display = 'none'; // Hide the form
    document.getElementById('addProductButton').style.display = 'inline-block'; // Show the Add Product button
}

// Function to reset the Add Product form
function resetProductForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-category').value = 'tires';
}