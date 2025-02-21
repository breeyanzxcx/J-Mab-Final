<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J-MAB Product Page</title>
    <link rel="stylesheet" href="product_board.css">
</head>
<body>
    <main>
        <div class="product-container">
            <div class="product-grid">
                <div class="product-image">
                    <img src="../Tire(1).png" alt="Gulong ng Mundo Tire" class="tire1">
                </div>
                <div class="product-details">
                    <h1>Gulong ng Mundo</h1>
                    <p class="brand">Brand: Earth</p>
                    <div class="rating">★★★★★ 5 Star Ratings</div>
                    <div class="price">₱100.00</div>
                    <div class="size-selector">
                        <label for="size">Select Sizes</label>
                        <select id="size">
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="26">26</option>
                        </select>
                    </div>
                    <div class="description">
                        Looking for top-quality tires? Our high-performance options provide superior traction, long-lasting durability, and a smoother, safer ride in all conditions. Perfect for any road—upgrade your driving experience today!
                    </div>
                    <div class="quantity">
                        <button class="qty-btn">-</button>
                        <input type="number" class="qty-input" value="1" min="1">
                        <button class="qty-btn">+</button>
                    </div>
                    <div class="buttons">
                        <button class="add-to-cart">ADD TO CART</button>
                        <button class="buy-now">BUY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const qtyButtons = document.querySelectorAll('.qty-btn');
            qtyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const input = button.parentElement.querySelector('.qty-input');
                    let value = parseInt(input.value);
                    if (button.textContent === '-') {
                        value = value > 1 ? value - 1 : 1;
                    } else {
                        value += 1;
                    }
                    input.value = value;
                });
            });

            const addToCartBtn = document.querySelector('.add-to-cart');
            const buyNowBtn = document.querySelector('.buy-now');
            addToCartBtn.addEventListener('click', () => {
                alert('Added to cart!');
            });
            buyNowBtn.addEventListener('click', () => {
                alert('Proceeding to checkout!');
            });
        });
    </script>
</body>
</html>