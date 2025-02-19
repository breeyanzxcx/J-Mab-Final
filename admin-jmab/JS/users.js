document.addEventListener("DOMContentLoaded", function () {
    // Logout confirmation
    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
            window.location.href = '../J-Mab/HTML/sign-in.php';
        }
    });

    fetchUsers();

    // Show Add User Form
    document.getElementById("add-user-btn").addEventListener("click", function () {
        document.getElementById("add-user-form").classList.toggle("hidden");
    });

    // Add User Function
    document.getElementById("add-user-form").addEventListener("submit", function (e) {
        e.preventDefault();
    
        const userData = {
            first_name: document.getElementById("first_name").value.trim(),
            last_name: document.getElementById("last_name").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
            address: document.getElementById("address").value.trim()
        };
    
        fetch('/JMAB/admin-jmab/addUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Send JSON data
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("User added successfully!");
                document.getElementById("add-user-form").reset();
                document.getElementById("add-user-form").classList.add("hidden");
                fetchUsers(); // Refresh users list
            } else {
                alert("Failed to add user: " + data.error);
            }
        })
        .catch(error => console.error("Error adding user:", error));
    });
    

    // Fetch Users
    function fetchUsers() {
        fetch("/JMAB/admin-jmab/fetch_customer.php")
            .then(response => response.json())
            .then(users => {
                const tableBody = document.querySelector('#customers-table tbody');
                tableBody.innerHTML = '';

                users.forEach(user => {
                    const row = `
                        <tr data-id="${user.id}">
                            <td>${user.first_name}</td>
                            <td>${user.last_name}</td>
                            <td>${user.email}</td>
                            <td>${user.password ? "******" : "!@#$%^&*"}</td>
                            <td>${user.address}</td>
                            <td><button class="delete-btn" data-id="${user.id}">Delete</button></td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });

                // Add Delete Event Listeners
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const userId = this.getAttribute('data-id');
                        deleteUser(userId, this);
                    });
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    // Delete User
    function deleteUser(id, button) {
        if (!confirm("Are you sure you want to delete this user?")) return;

        fetch('/JMAB/admin-jmab/deleteCustomer.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                button.closest('tr').remove();
            } else {
                alert("Failed to delete user: " + data.error);
            }
        })
        .catch(error => console.error("Error deleting user:", error));
    }
});
