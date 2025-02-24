document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token"); // Get stored auth token

    if (!token) {
        alert("Unauthorized access. Please log in.");
        window.location.href = "../J-Mab/HTML/sign-in.php"; // Redirect to login page
        return;
    }

    fetchUsers(token);

    // Logout Function
    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("token"); // Remove token
            window.location.href = '../J-Mab/HTML/sign-in.php';
        }
    });
});

// Fetch Users from API
function fetchUsers(token) {
    fetch("http://localhost/jmab/old_jmab/api/user/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayUsers(data.users);
        } else {
            console.error("Error fetching users:", data.errors);
            alert("Error: " + data.errors.join(", "));
        }
    })
    .catch(error => console.error("Fetch error:", error));
}

// Function to display users in the table
function displayUsers(users) {
    const tableBody = document.getElementById("usersTable");
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>********</td> <!-- Hide password -->
            <td>${user.address || "N/A"}</td>
            <td>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach event listener for Delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.getAttribute("data-id");
            deleteUser(userId, this);
        });
    });
}

// Function to delete a user
function deleteUser(userId, button) {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    fetch("http://localhost/jmab/old_jmab/api/user/delete", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User deleted successfully.");
            button.closest('tr').remove(); // Remove row from UI
        } else {
            alert("Failed to delete user: " + (data.errors ? data.errors.join(', ') : "Unknown error"));
        }
    })
    .catch(error => console.error("Error deleting user:", error));
}
