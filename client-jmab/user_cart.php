<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J-MAB Cart</title>
    <link rel="stylesheet" href="user_cart.css">
</head>
<body>
    <main>
        <div class="cart-container">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div class="select-all-section">
                    <input type="checkbox" id="select-all">
                    <label for="select-all">SELECT ALL ITEMS</label>
                    <button class="delete-btn">DELETE</button>
                </div>
                <div class="location-section">
                    <div class="location-text">
                        <span><img src="../images/location.png" alt="Cart"> LOCATION</span>
                        <span>123 Main Street, Barangay San Roque, Quezon City Metro Manila</span>
                    </div>
                    <button class="change-address">CHANGE ADDRESS</button>
                </div>
            </div>

            <div class="cart-item">
                <input type="checkbox" class="item-checkbox">
                <div class="item-details">
                    <img src="https://via.placeholder.com/100" alt="Gulong ng Mundo Tire">
                    <div class="item-info">
                        <h3>Gulong ng Mundo</h3>
                        <p>Brand: Earth</p>
                    </div>
                </div>
                <div class="item-price">₱100.00</div>
                <div class="quantity">
                    <button class="qty-btn">-</button>
                    <input type="number" value="1" min="1" class="qty-input">
                    <button class="qty-btn">+</button>
                </div>
                <div class="item-actions">
                    <img src="https://via.placeholder.com/20" alt="Like">
                    <img src="https://via.placeholder.com/20" alt="Trash">
                </div>
            </div>

            <div class="order-summary">
                <h4>ORDER SUMMARY</h4>
                <p>SUBTOTAL (1 ITEM(S)) <span>₱100.00</span></p>
                <p>SHIPPING FEE <span>₱50.00</span></p>
                <p>TOTAL <span>₱150.00</span></p>
                <button class="checkout-btn">PROCEED TO CHECKOUT</button>
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
                    updateTotal();
                });
            });

            const selectAll = document.getElementById('select-all');
            const itemCheckboxes = document.querySelectorAll('.item-checkbox');
            selectAll.addEventListener('change', () => {
                itemCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAll.checked;
                });
            });

            function updateTotal() {
                const qty = document.querySelector('.qty-input').value;
                const subtotal = 100 * qty;
                const shipping = 50;
                const total = subtotal + shipping;

                document.querySelector('.order-summary p:nth-child(2) span').textContent = `₱${subtotal}.00`;
                document.querySelector('.order-summary p:nth-child(3) span').textContent = `₱${shipping}.00`;
                document.querySelector('.order-summary p:nth-child(4) span').textContent = `₱${total}.00`;
            }

            updateTotal();
        });
    </script>
</body>
</html>