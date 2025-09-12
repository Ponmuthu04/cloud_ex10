const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const apiUrl = "/users";

async function loadUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.email})`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await fetch(`${apiUrl}/${user.id}`, { method: "DELETE" });
      loadUsers();
    };
    li.appendChild(delBtn);
    userList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  form.reset();
  loadUsers();
});

window.onload = loadUsers;
