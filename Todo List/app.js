const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
let todos = [];

// Add new to-do
form.addEventListener('submit', function(event) {
	event.preventDefault();
	const todo = input.value.trim();
	if (todo !== '') {
		const newTodo = { id: Date.now(), text: todo };
		todos.push(newTodo);
		addTodoToDOM(newTodo);
		saveToLocalStorage();
		input.value = '';
		input.focus();
	}
});

// Update to-do
list.addEventListener('click', function(event) {
	if (event.target.tagName.toLowerCase() === 'input') {
		const id = parseInt(event.target.dataset.id, 10);
		const checkbox = event.target;
		const todo = todos.find(todo => todo.id === id);
		todo.completed = checkbox.checked;
		saveToLocalStorage();
	}
});

// Delete to-do
list.addEventListener('click', function(event) {
	if (event.target.tagName.toLowerCase() === 'button') {
		const id = parseInt(event.target.dataset.id, 10);
		const todoIndex = todos.findIndex(todo => todo.id === id);
		todos.splice(todoIndex, 1);
		event.target.parentNode.remove();
		saveToLocalStorage();
	}
});

// Add to-do to DOM
function addTodoToDOM(todo) {
	const li = document.createElement('li');
	li.innerHTML = `
		<input type="checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
		<span>${todo.text}</span>
		<button data-id="${todo.id}">Delete</button>
	`;
	list.appendChild(li);
}

// Load to-dos from local storage
function loadFromLocalStorage() {
	const localTodos = JSON.parse(localStorage.getItem('todos'));
	if (localTodos !== null) {
		todos = localTodos;
		todos.forEach(todo => addTodoToDOM(todo));
	}
}

// Save to-dos to local storage
function saveToLocalStorage() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

loadFromLocalStorage();
