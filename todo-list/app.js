document.addEventListener("DOMContentLoaded", () => {

    // HTML elements
    const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const searchInput = document.getElementById("searchInput");
    const todoList = document.getElementById("todoList");
    const todoCount = document.getElementById("todoCount");
    const clearBtn = document.getElementById("clearBtn");
    const emptyMessage = document.getElementById("emptyMessage");
    
    // Todos load from localStorage
    let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
    
    // ==============================
    // SAVE TODOS
    // ==============================
    function saveTodos() {
    localStorage.setItem("myTodos", JSON.stringify(todos));
    }
    
    // ==============================
    // ADD TODO
    // ==============================
    function addTodo() {
    
    const text = todoInput.value.trim();
    
    // Empty input check
    if (text === "") {
      alert("Please enter a todo!");
      todoInput.focus();
      return;
    }
    
    // New todo
    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    // Add to array
    todos.push(todo);
    
    // Save
    saveTodos();
    
    // Clear input
    todoInput.value = "";
    
    // Show todos
    renderTodos();
    
    // Focus input again
    todoInput.focus();
    
    }
    
    // ==============================
    // DISPLAY TODOS
    // ==============================
    function renderTodos() {
    
    // Clear old list
    todoList.innerHTML = "";
    
    // Search value
    const searchValue = searchInput.value
      .toLowerCase()
      .trim();
    
    // Filter todos
    const filteredTodos = todos.filter(todo =>
      todo.text.toLowerCase().includes(searchValue)
    );
    
    
    // Create todo items
    filteredTodos.forEach(todo => {
    
      const li = document.createElement("li");
    
      li.className = "todo-item";
    
      if (todo.completed) {
        li.classList.add("completed");
      }
    
    
      // Todo text
      const span = document.createElement("span");
    
      span.className = "todo-text";
    
      span.textContent = todo.text;
    
    
      // ==============================
      // DONE / UNDO BUTTON
      // ==============================
      const doneBtn = document.createElement("button");
    
      doneBtn.className = "action-btn complete-btn";
    
      doneBtn.textContent =
        todo.completed ? "Undo" : "Done";
    
      doneBtn.addEventListener("click", () => {
    
        todo.completed = !todo.completed;
    
        saveTodos();
    
        renderTodos();
    
      });
    
    
      // ==============================
      // EDIT BUTTON
      // ==============================
      const editBtn = document.createElement("button");
    
      editBtn.className = "action-btn edit-btn";
    
      editBtn.textContent = "Edit";
    
      editBtn.addEventListener("click", () => {
    
        const newText = prompt(
          "Edit your todo:",
          todo.text
        );
    
        if (newText !== null) {
    
          const updatedText = newText.trim();
    
          if (updatedText !== "") {
    
            todo.text = updatedText;
    
            saveTodos();
    
            renderTodos();
    
          }
    
        }
    
      });
    
    
      // ==============================
      // DELETE BUTTON
      // ==============================
      const deleteBtn = document.createElement("button");
    
      deleteBtn.className = "action-btn delete-btn";
    
      deleteBtn.textContent = "Delete";
    
      deleteBtn.addEventListener("click", () => {
    
        const confirmDelete = confirm(
          "Are you sure you want to delete this todo?"
        );
    
        if (confirmDelete) {
    
          todos = todos.filter(
            item => item.id !== todo.id
          );
    
          saveTodos();
    
          renderTodos();
    
        }
    
      });
    
    
      // Add elements to LI
      li.appendChild(span);
      li.appendChild(doneBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    
      // Add LI to UL
      todoList.appendChild(li);
    
    });
    
    
    // ==============================
    // TODO COUNT
    // ==============================
    todoCount.textContent =
      `${filteredTodos.length} ${
        filteredTodos.length === 1
          ? "Todo"
          : "Todos"
      }`;
    
    
    // ==============================
    // EMPTY MESSAGE
    // ==============================
    if (filteredTodos.length === 0) {
    
      emptyMessage.style.display = "block";
    
    } else {
    
      emptyMessage.style.display = "none";
    
    }
    
    }
    
    // ==============================
    // ADD BUTTON
    // ==============================
    addBtn.addEventListener("click", addTodo);
    
    // ==============================
    // ENTER KEY
    // ==============================
    todoInput.addEventListener("keydown", (event) => {
    
    if (event.key === "Enter") {
    
      addTodo();
    
    }
    
    });
    
    // ==============================
    // SEARCH
    // ==============================
    searchInput.addEventListener("input", () => {
    
    renderTodos();
    
    });
    
    // ==============================
    // CLEAR ALL
    // ==============================
    clearBtn.addEventListener("click", () => {
    
    if (todos.length === 0) {
      alert("There are no todos to delete.");
      return;
    }
    
    const confirmClear = confirm(
      "Are you sure you want to delete all todos?"
    );
    
    if (confirmClear) {
    
      todos = [];
    
      saveTodos();
    
      renderTodos();
    
    }
    
    });
    
    // ==============================
    // INITIAL LOAD
    // ==============================
    renderTodos();
    
    });