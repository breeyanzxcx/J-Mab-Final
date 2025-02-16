<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J-Mab Admin</title>
    <link rel="stylesheet" href="admin.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <!-- SIDEBAR -->
    <section id="sidebar">
       <div class="h1">J-Mab Admin Page</div>
        <hr>
        <ul class="side-menu">
            <li><a href="#" data-section="dashboard-content" onclick="showSection('dashboard-content', this)"><i class="fas fa-gauge"></i> Dashboard</a></li>
            <li><a href="#" data-section="products-content" onclick="showSection('products-content', this)"><i class="fas fa-box"></i> Products</a></li>
            <li><a href="#" data-section="products-content" onclick="showSection('products-content', this)"><i class="fas fa-box"></i> Order Confimation</a></li>
            <li><a href="#" data-section="users-content" onclick="showSection('users-content', this)"><i class="fas fa-box"></i> Users</a></li>            <!--MAKIKITA KUNG SINO YUNG MGA NAG USER SA PAGE -->
            <li id="logout"><a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
    </section>

    <!-- MAIN CONTENT -->
    <main>
        <!-- DASHBOARD CONTENT -->
        <div id="dashboard-content" class="content-section">
            <h1>DASHBOARD</h1>
            <div class="boxes">
                <div class="TotalSales">
                    <i class="fa-solid fa-chart-line icon"></i>
                    <p>Sales</p>
                </div>
                <div class="TotalCustomers">
                    <i class="fa-solid fa-user icon"></i>
                    <p>Customers</p>
                </div>
            </div>

            <div class="orders-container">
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Order</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Christian</td>
                            <td>2024-01-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Marvin</td>
                            <td>2024-02-24</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>Diddy</td>
                            <td>2024-08-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Noah</td>
                            <td>2024-05-25</td>
                            <td><span class="status canceled">Cancelled</span></td>
                        </tr>
                        <tr>
                            <td>Elijah</td>
                            <td>2024-12-25</td>
                            <td><span class="status canceled">Cancelled</span></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>2024-03-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>2024-03-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Marvin</td>
                            <td>2024-02-24</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>2024-03-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Noah</td>
                            <td>2024-05-25</td>
                            <td><span class="status canceled">Cancelled</span></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>2024-03-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>2024-03-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Marvin</td>
                            <td>2024-02-24</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>Diddy</td>
                            <td>2024-08-25</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

        <div id="products-content" class="content-section">
            <h3>INVENTORY</h3>
            <button class="add-product-btn" onclick="toggleProductForm('tire-section')">Add Product</button>
            <hr>

            <!--ITO YUNG LUMALABAS PAG CLINICK MO YUNG ADD PRODUCT-->
            <div class="product-form" id="product-form">
                <h2>Add Product</h2>
                <label for="product-name">Product Name:</label>
                <input type="text" id="product-name" placeholder="Product Name">

                <label for="product-price">Price:</label>
                <input type="number" id="product-price" placeholder="Price (₱)">

                <label for="product-image">Image URL:</label>
                <input type="text" id="product-image" placeholder="Image URL">

                <label for="product-category">Category:</label>
                <select id="product-category">
                    <option value="tires">Tires</option>
                    <option value="batteries">Batteries</option>
                    <option value="lubricants">Lubricants</option>
                    <option value="oil">Oil</option>
                </select>

                <button onclick="addProduct()">Confirm</button>
                <button onclick="cancelAddProduct()">Cancel</button>
            </div>

            
            <div class="flex-container">
                <div class="tire-title"><h3>Tire section</h3></div>
                <div class="tire-section">
                        <div class="item-container">
                            <!--DITO MALALAGAY YUNG MGA ITEMS-->
                        </div>
                </div>
               
            </div>

            <hr>

            <div class="flex-container" >
                <div class="Battery-title"><h3>Battery section</h3></div>
                <div class="Battery-section">
                    <div class="item-container">
                        <!--DITO MALALAGAY YUNG MGA ITEMS-->
                    </div>
                </div>
               
            </div>

            <hr>

            <div class="flex-container" >
                <div class="Lubricant-title"><h3>Lubricant section</h3></div>
                <div class="Lubricant-section">
                    <div class="item-container">
                        <!--DITO MALALAGAY YUNG MGA ITEMS-->
                    </div>
                </div>
                
            </div>

            <hr>

            <div class="flex-container" >
                <div class="Oil-title"><h3>Oil section</h3></div>
                <div class="Oil-section">
                    <div class="item-container">
                        <!--DITO MALALAGAY YUNG MGA ITEMS-->
                    </div>
                </div>
       
            </div>

            <div class="product-form" id="product-form">
                <input type="text" id="product-name" placeholder="Product Name">
                <input type="text" id="product-price" placeholder="Price (₱)">
                <input type="text" id="product-image" placeholder="Image URL">
                <button onclick="addProduct()">Confirm</button>
            </div>
        </div>
    </main>

    <script src="/admin-jmab/admin.js"></script>
</body>
</html>