document.addEventListener("DOMContentLoaded", function () {
    // Logout confirmation
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
                window.location.href = '../J-Mab/HTML/sign-in.php';
            }
        });
    }

    fetchUsers(); // Fetch users when the page loads

    // Fetch Users and Display in Table
    function fetchUsers() {
        fetch("http://localhost/jmab/old_jmab/api/user/users", {
            headers: { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const tableBody = document.querySelector('#customers-table tbody');
                tableBody.innerHTML = '';

                data.users.forEach(user => {
                    if (user.roles === "customer") { 
                        const row = `
                            <tr data-id="${user.id}">
                                <td>${user.first_name}</td>
                                <td>${user.last_name}</td>
                                <td>${user.email}</td>
                                <td><button class="view-btn" data-id="${user.id}">View</button></td>
                            </tr>
                        `;
                        tableBody.innerHTML += row;
                    }
                });

                // Attach view event listeners
                document.querySelectorAll('.view-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const userId = this.getAttribute('data-id');
                        viewTransactions(userId);
                    });
                });
            } else {
                console.error("Error fetching users:", data.errors);
            }
        })
        .catch(error => console.error("Error fetching users:", error));
    }

    // Function to fetch and display recent transactions
    function viewTransactions(userId) {
        fetch(`http://localhost/jmab/old_jmab/api/user/get_transactions.php?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                let transactionsHTML = `<h2>Recent Transactions</h2>`;
    
                if (data.success && data.transactions.length > 0) {
                    transactionsHTML += `<ul>`;
                    data.transactions.forEach(transaction => {
                        transactionsHTML += `<li>Order ID: ${transaction.order_id} - ₱${transaction.amount} - ${transaction.date}</li>`;
                    });
                    transactionsHTML += `</ul>`;
                } else {
                    transactionsHTML += `
                        <div style="margin-top: 20%; display: flex; justify-content: center; align-text: center; height: 100%;">
                            <p style="font-size: 18px;">NO TRANSACTIONS</p>
                        </div>
                    `;
                }
    
                // Display transactions in the modal
                document.getElementById("transaction-view-content").innerHTML = transactionsHTML;
                document.getElementById("transaction-view").style.display = "block";
            })
            .catch(error => console.error("Error fetching transactions:", error));
    }

    // Close View function
    function closeView() {
        document.getElementById("transaction-view").style.display = "none";
    }

    // Attach close event listener after DOM is loaded
    const closeBtn = document.getElementById("close-view-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeView);
    }
});
