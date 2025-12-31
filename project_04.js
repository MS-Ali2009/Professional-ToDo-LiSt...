// Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-todo-button');
const todoList = document.getElementById('todo-list');

// Todos array
let todos = [];

// Load todos from localStorage on page load
window.onload = () => {
    const saved = localStorage.getItem("todos");
    if (saved) {
        todos = JSON.parse(saved);
        renderTodos();
    }
}

// Add a new todo
function addTodo() {
    const task = input.value.trim();
    if (!task) {
        alert("Please enter a todo item.");
        return;
    }

    todos.push(task);
    saveAndRender();
    input.value = "";
}

// Render todos to screen
function renderTodos() {
    todoList.innerHTML = "";
    
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-clipboard-list text-4xl mb-3"></i>
                <p>No tasks yet. Add a task to get started!</p>
            </div>
        `;
        return;
    }
    
    todos.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = "flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200";
        
        const taskText = document.createElement('span');
        taskText.className = "text-gray-800 font-medium";
        taskText.textContent = task;
        
        const delBtn = document.createElement('button');
        delBtn.className = "bg-red-100 text-red-600 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
        delBtn.innerHTML = '<i class="fas fa-trash mr-1"></i> Remove';
        delBtn.onclick = () => deleteTodo(index);

        li.appendChild(taskText);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
}

// Delete a todo
function deleteTodo(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        todos.splice(index, 1);
        saveAndRender();
    }
}

// Save to localStorage and render
function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

// Event listeners
addBtn.onclick = addTodo;
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});