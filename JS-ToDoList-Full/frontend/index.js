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
