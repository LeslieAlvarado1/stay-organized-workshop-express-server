"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const userDropdown = document.getElementById("userDropdown");
  const categoryDropdown = document.getElementById("categoryDropdown");
  const priorityDropdown = document.getElementById("priorityDropdown");
  const addButton = document.getElementById("addTodoBtn");

  grabUserDataFromAPI();
  grabCategoriesFromAPI();
  addButton.addEventListener("click", addData);
});

function grabUserDataFromAPI() {
  fetch("/data/users.json")
    .then((response) => response.json())
    .then((data) => generateUserDropdown(data))
    .catch((error) => console.error("Error fetching user data:", error));
}

function grabCategoriesFromAPI() {
  fetch("/data/categories.json")
    .then((response) => response.json())
    .then((data) => generateCategory(data))
    .catch((error) => console.error("Error fetching category data:", error));
}

function generateUserDropdown(_data) {
  const userDropdown = document.getElementById("userDropdown"); // Ensure element is re-selected
  _data.forEach((user) => {
    const option = new Option(user.name, user.id);
    userDropdown.appendChild(option);
  });
}

function generateCategory(_data) {
  const categoryDropdown = document.getElementById("categoryDropdown"); // Ensure element is re-selected
  _data.forEach((category) => {
    const option = new Option(category.name, category.id);
    categoryDropdown.appendChild(option);
  });
}

function addData() {
  const userDropdown = document.getElementById("userDropdown"); // Ensure element is re-selected
  const categoryDropdown = document.getElementById("categoryDropdown"); // Ensure element is re-selected
  const priorityDropdown = document.getElementById("priorityDropdown"); // Ensure element is re-selected
  const description = document.getElementById("description").value;
  const deadline = document.getElementById("deadline").value;

  const userid = userDropdown.value;
  const category = categoryDropdown.value;
  const priority = priorityDropdown.value;

  if (userid === "default" || category === "default" || priority === "default") {
    alert("Please select valid options for all dropdowns.");
    return;
  }

  const todo = { userid, category, description, deadline, priority };

  console.log('Sending data:', todo);

  fetch('http://localhost:8083/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }

      return response.json(); // Parse response as JSON
    })
    .then(data => {
      console.log('Success:', data);
      alert('ToDo added successfully');
      document.getElementById('todoForm').reset(); // Ensure form ID matches
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to add ToDo: ' + error.message);
    });
}
