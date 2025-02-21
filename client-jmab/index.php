<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>J-MAB Dashboard</title>
  <link rel="stylesheet" href="client.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo-container">
      <img src="../images/J-mab Logo.png" alt="J-MAB Logo">
      <span>J-MAB</span>
    </div>
    <div class="nav-links">
      <a href="index.php?page=home" class="<?php echo (!isset($_GET['page']) || $_GET['page'] == 'home') ? 'active' : ''; ?>">HOME</a>
      <a href="index.php?page=products" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'products') ? 'active' : ''; ?>">PRODUCTS</a>
      <a href="index.php?page=about" class="<?php echo (isset($_GET['page']) && $_GET['page'] == 'about') ? 'active' : ''; ?>">ABOUT</a>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Search">
      <button>
        <img src="../images/search.png" alt="Search Icon">
      </button>
    </div>
    <div class="action-icons">
      <img src="../images/cart.png" alt="Cart Icon">
      <img src="../images/notifications.png" alt="Notification Icon">
      <div class="../profile-button" onclick="toggleDropdown()">
        <img src="../images/profile.png" alt="Profile Icon">
      </div>
      <div class="profile-dropdown" id="profileDropdown">
        <a href="#">My Profile</a>
        <a href="#">Settings</a>
        <a href="#">Logout</a>
      </div>
    </div>
  </nav>

  <div class="container">
    <div class="content">
      <?php
      if (isset($_GET['page']) && $_GET['page'] == 'products') {
        include 'products.php';
      } else {
        include 'home.php';
      }
      ?>
    </div>
  </div>

  <footer class="footer">
    <div class="footer-left">
      <img src="images/fb.png" alt="Website Icon" class="footer-icon">
      <a href="https://www.facebook.com/jmab.trd" target="_blank">www.facebook.com/jmab.trd</a>
    </div>
    <div class="footer-right">
      <div class="contact-info">
        <img src="images/phone.png" alt="Phone Icon" class="footer-icon">
        <span>GLOBE: 0977 769 3620</span> &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>SMART: 0946 298 6767</span>
      </div>
    </div>
  </footer>

  <script>
    function toggleDropdown() {
      const dropdown = document.getElementById('profileDropdown');
      dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    }

    window.addEventListener('click', function (e) {
      const profileButton = document.querySelector('.profile-button');
      const dropdown = document.getElementById('profileDropdown');
      if (!profileButton.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    function sortProducts() {
      const sortOption = document.getElementById("sortDropdown").value;
      const productGrid = document.getElementById("productGrid");
      let products = Array.from(productGrid.children);

      if (sortOption === "price-low-high") {
        products.sort((a, b) => a.dataset.price - b.dataset.price); // Price Low to High
      } else if (sortOption === "price-high-low") {
        products.sort((a, b) => b.dataset.price - a.dataset.price); // Price High to Low
      } else if (sortOption === "recent") {
        products.sort((a, b) => b.dataset.date - a.dataset.date); // Recently Added
      }

      productGrid.innerHTML = "";
      products.forEach(product => productGrid.appendChild(product));
    }
  </script>
</body>
</html>