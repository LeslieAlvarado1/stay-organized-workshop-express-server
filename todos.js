"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const userDropdown = document.getElementById("userDropdown");
  const infoButton = document.getElementById("showInfo");
  
  grabUserDataFromAPI();
  infoButton.addEventListener("click", displayData);
});

function grabUserDataFromAPI() {
  fetch("/data/users.json")
    .then((response) => response.json())
    .then((data) => generateUserDropdown(data))
    .catch((error) => console.error("Error fetching user data:", error));
}


function generateUserDropdown(_data) {
  const userDropdown = document.getElementById("userDropdown"); // Ensure element is re-selected
  _data.forEach((user) => {
    const option = new Option(user.name, user.id);
    userDropdown.appendChild(option);
  });
}


function displayData() {
  const userDropdown = document.getElementById("userDropdown"); // Ensure element is re-selected
  const userId = userDropdown.value;

  fetch("/data/todos.json")
    .then((response) => response.json())
    .then((data) => {
      const userTodos = data.filter((todo) => todo.userid == userId);
      displayTodoList(userTodos);
    })
    .catch((error) => console.error(error));
}

function displayTodoList(todos) {
  const todoList = document.getElementById("todoList"); // Ensure element is re-selected
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
