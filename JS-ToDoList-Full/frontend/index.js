const baseURL = "http://localhost:3000"; // Adjust this to your backend URL if needed
const tasks = []; // This will hold the tasks fetched from the server

document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const todoList = document.querySelector("ul");

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  addButton.addEventListener("click", () => {
    const value = input.value.trim();
    if (value) {
      persistTask(value);
      input.value = "";
    }
  });

  todoList.addEventListener("click", (event) => {
    const taskObject = getClosestSpanSibling(event.target);
    if (event.target.tagName === "BUTTON") {
      deleteTaskFromServer(taskObject, event);
    } else if (
      event.target.tagName === "INPUT" &&
      event.target.type === "checkbox"
    ) {
      markTaskAsDone(taskText, event);
      // onItemChecked(event);
    }
  });

  initialize().catch((error) => {
    console.error("Error initializing ToDo List:", error);
  });
});

async function initialize() {
  this.tasks = await getTasksFromServer();
  addServerTasksToList(this.tasks);
}

function addServerTasksToList(tasks) {
  tasks.forEach((task) => {
    addItemToList(task);
  });
}

function getClosestSpanSibling(element) {
  // Find the closest span element that contains the task text
  const taskSpan = element.closest("span").querySelector("span");
  const taskText = taskSpan.textContent;
  const taskId = taskSpan.id;
  return {
    name: taskText,
    id: taskId, // Use the ID from the inner span
    done: taskSpan.style.textDecoration === "line-through", // Check if the task is marked as done
  };
}

function addItemToList(task) {
  const li = document.createElement("li");
  const outerSpan = document.createElement("span");
  const innerSpan = document.createElement("span");
  innerSpan.textContent = task.name;
  innerSpan.id = task.id; // Set the ID for the task
  innerSpan.style.textDecoration = task.done ? "line-through" : "none"; // Mark as done if applicable

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
  addItemToList(data.task); // Add the new task to the list
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

async function deleteTaskFromServer(task, event) {
  console.log("deleteTaskFromServer called with task:", task.id);
  // This function can be used to delete a task from a backend server
  const response = await fetch(`${baseURL}/tasks/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to delete task:", response.statusText);
    return;
  }
  onDeleteClick(event); // Remove the task from the UI
}

function markTaskAsDone(task, event) {
  // This function can be used to mark a task as done
  const response = fetch(`${baseURL}/tasks/${task}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("Failed to mark task as done:", response.statusText);
    return;
  }
  onItemChecked(event); // Update the UI to reflect the task as done
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
