function addTodo() {
 // 1) Get the input element
 const inputEl = document.getElementById("todoInput");
  // 2) Get the value from the input (use .value property)
  const todoText = inputEl.value;
  // 3) Get the ul element (the todo list)
  const listEl = document.getElementById("todoList");
  // 4) Use insertAdjacentHTML('beforeend', '<li>...</li>') to add the item
  //    Make sure to include the todo text in the <li>
  listEl.insertAdjacentHTML('beforeend', `<li>${todoText}</li>`);
  // 5) Clear the input field (set .value to empty string)
  inputEl.value = '';
}