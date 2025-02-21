<?php
$products = [
  ["img" => "images/tire1.png", "name" => "Tire Example", "price" => 100, "date" => "20240101", "category" => "tires"],
  ["img" => "images/oil3.png", "name" => "Oil Example", "price" => 200, "date" => "20240110", "category" => "oils"],
  ["img" => "images/battery6.png", "name" => "Battery Example", "price" => 300, "date" => "20240105", "category" => "batteries"],
  ["img" => "images/lubricant1.png", "name" => "Lubricant Example", "price" => 400, "date" => "20240109", "category" => "lubricants"]
];

$category = isset($_GET['category']) ? $_GET['category'] : 'all';

$filteredProducts = array_filter($products, function($product) use ($category) {
  return $category === 'all' || $product['category'] === $category;
});
?>

<div class="content">
  <div class="sidebar">
    <h3><img src="../images/categories.png" alt="Category Icon"> CATEGORIES</h3>
    <a href="index.php?page=home&category=all" class="<?php echo ($category === 'all') ? 'active' : ''; ?>"><img src="../images/bag.png" alt="All Icon">ALL ITEMS</a>
    <hr>
    <a href="index.php?page=home&category=tires" class="<?php echo ($category === 'tires') ? 'active' : ''; ?>"><img src="../images/tires.png" alt="Tires Icon">TIRES</a>
    <hr>
    <a href="index.php?page=home&category=batteries" class="<?php echo ($category === 'batteries') ? 'active' : ''; ?>"><img src="../images/battery.png" alt="Batteries Icon">BATTERIES</a>
    <hr>
    <a href="index.php?page=home&category=oils" class="<?php echo ($category === 'oils') ? 'active' : ''; ?>"><img src="../images/oil.png" alt="Oils Icon">OILS</a>
    <hr>
    <a href="index.php?page=home&category=lubricants" class="<?php echo ($category === 'lubricants') ? 'active' : ''; ?>"><img src="../images/lubricant.png" alt="Lubricants Icon">LUBRICANTS</a>
  </div>

  <div class="products">
    <div class="product-grid">
      <?php
      foreach ($filteredProducts as $product) {
        echo '<div class="product-card" data-price="'.$product['price'].'" data-date="'.$product['date'].'">';
        echo '<img src="'.$product['img'].'" alt="'.$product['name'].'">';
        echo '<h4>'.$product['name'].'</h4>';
        echo '<div class="divider"></div>';
        echo '<p>₱'.$product['price'].'</p>';
        echo '</div>';
      }
      ?>
    </div>
  </div>
</div>