document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('createProductForm');
    const categorySelect = document.getElementById('category');
    const sizeField = document.getElementById('sizeField');
    const voltageField = document.getElementById('voltageField');
    const productFormContainer = document.getElementById('productFormContainer');
    const addProductButton = document.getElementById('addProductButton');
    const cancelButton = document.getElementById('cancelButton');

    const tireSection = document.querySelector('.tire-section');
    const batterySection = document.querySelector('.Battery-section');
    const lubricantSection = document.querySelector('.Lubricant-section');
    const oilSection = document.querySelector('.Oil-section');

    // Show/hide form
    addProductButton.addEventListener('click', function() {
        productFormContainer.style.display = 'block';
    });

    cancelButton.addEventListener('click', function() {
        productFormContainer.style.display = 'none';
    });

    // Show/hide fields based on category
    categorySelect.addEventListener('change', function() {
        // Show size field for Tires and voltage for Batteries
        sizeField.style.display = this.value === 'Tires' ? 'block' : 'none';
        voltageField.style.display = this.value === 'Batteries' ? 'block' : 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const productData = Object.fromEntries(formData.entries());
        productData.tags = productData.tags ? productData.tags.split(',').map(tag => tag.trim()) : [];

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Please log in first.');
                return;
            }

            const response = await fetch('http://localhost/jmab/old_jmab/api/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Product created successfully!');
                form.reset();
                loadProducts();  // Reload products after a new one is added
            } else {
                alert('Error: ' + result.errors.join('\n'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the product.');
        }
    });

    // Logout confirmation
    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault();
        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            window.location.href = '../J-Mab/HTML/sign-in.php';
        }
    });

    // Fetch and display products
    async function loadProducts() {
        try {
            const response = await fetch('http://localhost/jmab/old_jmab/api/product/products');
            const data = await response.json();  // The response now contains a "products" field

            console.log('API Response:', data);  // Log the entire response to check its structure

            if (data.success && Array.isArray(data.products)) {
                const products = data.products;  // Access the products array

                // Clear existing products in each section
                tireSection.innerHTML = '';
                batterySection.innerHTML = '';
                lubricantSection.innerHTML = '';
                oilSection.innerHTML = '';

                // Loop through each product and add to the corresponding section
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('item-container');

                    // Build the HTML content to display the product
                    productElement.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}" class="product-image">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <p>Stock: ${product.stock}</p> <!-- Display stock -->
                        ${product.size ? `<p>Size: ${product.size}</p>` : ''}
                        ${product.voltage ? `<p>Voltage: ${product.voltage}</p>` : ''}
                        <p>Price: $${product.price}</p>
                    `;

                    // Add product to the appropriate section based on category
                    switch (product.category) {
                        case 'Tires':
                            tireSection.appendChild(productElement);
                            break;
                        case 'Batteries':
                            batterySection.appendChild(productElement);
                            break;
                        case 'Lubricants':
                            lubricantSection.appendChild(productElement);
                            break;
                        case 'Oils':
                            oilSection.appendChild(productElement);
                            break;
                        default:
                            console.log('Unknown category:', product.category);
                    }
                });
            } else {
                console.error('API did not return the expected products array:', data);
                alert('Error: Products data is not in the expected format.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('An error occurred while fetching products.');
        }
    }

    // Initial load of products when page is loaded
    loadProducts();
});