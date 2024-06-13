"use strict";

const userDropdown = document.getElementById("userDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const priorityDropdown = document.getElementById("PriorityDropdown");
const displayInfo = document.getElementById("text");
const todoList = document.getElementById("todoList");
const infoButton = document.getElementById("showInfo");
const addButton = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", () => {
  grabUserDataFromAPI();
  grabGategoriesFromAPI();
  infoButton.addEventListener("click", displayData);
  addButton.addEventListener("click", addData);
});

function grabUserDataFromAPI() {
  fetch("/data/users.json")
    .then((response) => response.json())
    .then((data) => generateUserDropdown(data))
    .catch((error) => console.error("Error fetching user data:", error));
}

function grabGategoriesFromAPI() {
  fetch("/data/categories.json")
    .then((response) => response.json())
    .then((data) => generateGategory(data))
    .catch((error) => console.error("Error fetching user data:", error));
}
function generateUserDropdown(_data) {
  _data.forEach((user) => {
    const option = new Option(user.name, user.id);
    userDropdown.appendChild(option);
  });
}

function generateGategory(_data) {
  _data.forEach((category) => {
    const option = new Option(category.name, category.id);
    categoryDropdown.appendChild(option);
  });
}
function displayData() {
  const userId = dropdown.value;

  fetch("/data/todos.json")
    .then((response) => response.json())
    .then((data) => {
      const userTodos = data.filter((todo) => todo.userid == userId);
      displayTodoList(userTodos);
    })
    .catch((error) => console.error(error));
}

function displayTodoList(todos) {
  todoList.innerHTML = ""; // Clear the current list

  if (todos.length === 0) {
    todoList.innerHTML = "<li>No to-dos for this user.</li>";
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <strong>Category:</strong> ${todo.category} <br>
            <strong>Description:</strong> ${todo.description} <br>
            <strong>Deadline:</strong> ${todo.deadline} <br>
            <strong>Priority:</strong> ${todo.priority} <br>
            <strong>Completed:</strong> ${todo.completed ? "Yes" : "No"}
        `;
    todoList.appendChild(li);
  });
}

function addData() {
    const userid = userDropdown.value;
    const category = categoryDropdown.value;
    const priority = priorityDropdown.value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
  
    if (userid === "default" || category === "default" || priority === "default") {
      alert("Please select valid options for all dropdowns.");
      return;
    }
  
    const todo = { userid, category, description, deadline, priority };
  
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('ToDo added successfully');
      document.getElementById('todoForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to add ToDo');
    });
  };
