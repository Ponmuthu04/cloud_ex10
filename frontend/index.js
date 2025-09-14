const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const apiUrl = "http://localhost:8080/users";

let editingUserId = null;

async function loadUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="user-info">${user.name} (${user.email})</span>
      <div class="user-actions">
        <button class="edit-btn" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    userList.appendChild(li);
  });
}

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

function editUser(id, name, email) {
  editingUserId = id;
  nameInput.value = name;
  emailInput.value = email;
  submitBtn.textContent = "Update User";
  cancelBtn.style.display = "inline-block";
  nameInput.focus();
}

function cancelEdit() {
  editingUserId = null;
  form.reset();
  submitBtn.textContent = "Add User";
  cancelBtn.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;

  if (editingUserId) {
    // Update existing user
    await fetch(`${apiUrl}/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    cancelEdit();
  } else {
    // Create new user
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    form.reset();
  }
  loadUsers();
});

cancelBtn.addEventListener("click", cancelEdit);

window.onload = loadUsers;