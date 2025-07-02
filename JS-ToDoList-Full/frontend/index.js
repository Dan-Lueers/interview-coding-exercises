const baseURL = "http://localhost:3000"; // Adjust this to your backend URL if needed

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
      addItemToList(value);
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
});

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

  persistTask(value);
}

function persistTask(task) {
  // This function can be used to send the task to a backend server or save it locally
  console.log("Persisting task:", task);
  // Example: Send a POST request to a server
  fetch(`${baseURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: task }),
  });
  // Note: Uncomment the above code and adjust the URL to your backend endpoint if needed.
  // For now, we just log the task to the console.
  // This is where you would implement the logic to save the task, e.g., to a database or local storage.
  console.log("Task saved:", task);
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
