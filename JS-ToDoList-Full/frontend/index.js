const baseURL = "http://localhost:3000"; // Adjust this to your backend URL if needed
let tasks = []; // This will hold the tasks fetched from the server

document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const todoList = document.querySelector("ul");

  //   todoForm.addEventListener("submit", (event) => {
  //     event.preventDefault(); // Prevent form submission
  //     console.log("Form submitted");
  //   });

  addButton.addEventListener("click", () => {
    console.log("Add button clicked");
    const value = input.value.trim();
    if (value) {
      //addItemToList(value);
      persistTask(value);
      input.value = "";
    }
  });

  todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      onDeleteClick(event);
    } else if (
      event.target.tagName === "INPUT" &&
      event.target.type === "checkbox"
    ) {
      onItemChecked(event);
    }
  });

  initialize().catch((error) => {
    console.error("Error initializing ToDo List:", error);
  });
});

async function initialize() {
  console.log("Initializing ToDo List");
  this.tasks = await getTasksFromServer();
  addServerTasksToList(this.tasks);
}

function addServerTasksToList(tasks) {
  console.log("Tasks added to list:", tasks);
  tasks.forEach((task) => {
    addItemToList(task);
  });
}

function addItemToList(value) {
  const li = document.createElement("li");
  const outerSpan = document.createElement("span");
  const innerSpan = document.createElement("span");
  innerSpan.textContent = value;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const button = document.createElement("button");
  button.textContent = "Delete";

  outerSpan.appendChild(innerSpan);
  outerSpan.appendChild(checkbox);
  outerSpan.appendChild(button);
  li.appendChild(outerSpan);

  const ul = document.querySelector("ul");
  ul.appendChild(li);
}

async function persistTask(task) {
  // This function can be used to send the task to a backend server or save it locally
  console.log("Persisting task:", task);
  // Example: Send a POST request to a server
  const response = await fetch(`${baseURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: task }),
  });

  if (!response.ok) {
    console.error("Failed to save task:", response.statusText);
    return;
  }

  // Parse the JSON data from the response
  const data = await response.json();
  let newTask = data.jsonData.task;
  addItemToList(newTask); // Add the new task to the list
}

async function getTasksFromServer() {
  // This function can be used to fetch tasks from a backend server
  const response = await fetch(`${baseURL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch tasks from server:", response.statusText);
    return;
  }

  let tasks = await response.json();
  console.log("Tasks fetched from server:", tasks);
  return tasks;
}

function onDeleteClick(event) {
  const button = event.target;
  const li = button.closest("li");
  if (li) {
    li.remove();
  }
}

function onItemChecked(event) {
  const checkbox = event.target;
  const span = checkbox.previousElementSibling;

  if (checkbox.checked) {
    span.style.textDecoration = "line-through";
  } else {
    span.style.textDecoration = "none";
  }
}
