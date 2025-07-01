console.log("dkasl;dkal;s");


function onAddClick() {
  // get value from input
  const input = document.getElementById("input-item");
  const value = input.value;
  addItemToList(value);
  // clear input
  input.value = "";
}

function onDeleteClick(event) {
  // get the parent list item of the button
  const button = event.target;
  const li = button.parentElement.parentElement;
  // remove the list item
  li.remove();
}

function addItemToList(value) {
  // create new list item
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = value;

  // create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // create delete button
  const button = document.createElement("button");
  button.textContent = "delete";
  button.onclick = function () {
    li.remove();
  };

  // append elements to list item
  span.appendChild(checkbox);
  span.appendChild(button);
  li.appendChild(span);

  // append list item to the list
  const ul = document.querySelector("ul");
  ul.appendChild(li);
}

function onItemChecked(event) {
  // get the checkbox
  const checkbox = event.target;
  // get the parent list item
  const span = checkbox.previousElementSibling;

  // toggle strike-through style
  if (checkbox.checked) {
    span.style.textDecoration = "line-through";
  } else {
    span.style.textDecoration = "none";
  }
}