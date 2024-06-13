"use strict";

const userDropdown = document.getElementById("userDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const priorityDropdown = document.getElementById("priorityDropdown");
const addButton = document.getElementById("addTodoBtn");

document.addEventListener("DOMContentLoaded", () => {

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
  _data.forEach((user) => {
    const option = new Option(user.name, user.id);
    userDropdown.appendChild(option);
  });
}

function generateCategory(_data) {
  _data.forEach((category) => {
    const option = new Option(category.name, category.id);
    categoryDropdown.appendChild(option);
  });
}

function addData() {
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

  fetch('http://localhost:8083/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => {
  
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
