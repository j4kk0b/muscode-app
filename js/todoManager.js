class appManagerToDoList {
  todoContainer;
  todoCounter;
  todoForm;
  todoInput;
  todoList = [];

  todoCurrentTask;

  constructor() {
    this.todoContainer = document.querySelector(".todo-list__container");
    this.todoCounter = document.querySelector(".todo-list__counter");
    this.todoCounter.textContent = 0;
    this.todoInput = document.querySelector(".todo-list__add-new-element");
    this.todoForm = document.querySelector(".todo-list__form");

    // Get data from local storage
    this.getLocalStorage();

    // Update counter
    this.updateCounter();
    this.init();
  }

  // Update counter of done tasks
  updateCounter = () => {
    this.todoCounter.textContent =
      document.querySelectorAll(".todo-done").length;
  };

  // Line-throgh done task
  toggleTask = (e) => {
    this.todoCurrentTask = e.target.closest(".todo-list__item");

    this.todoCurrentTask.classList.toggle("todo-done");

    // Save if task is done or not
    this.todoList.forEach((task) => {
      if (
        task.title ===
        this.todoCurrentTask.querySelector(".todo-list__item-title").textContent
      )
        task.isDone = this.todoCurrentTask.classList.contains("todo-done");
    });

    // Update information about tasks
    this.setLocalStorage();

    // Update counter
    this.updateCounter();
  };

  // Delete task when it's marked as done
  deleteTask = (e) => {
    this.updateCounter();

    this.todoCurrentTask = e.target.closest(".todo-list__item");
    const titleOfTaskToDelete = this.todoCurrentTask.querySelector(
      ".todo-list__item-title"
    ).textContent;

    // Find index of task to delete and delete it from local storage
    this.todoList.forEach((task) => {
      if (task.title === titleOfTaskToDelete)
        this.todoList.splice(this.todoList.indexOf(task), 1);
    });

    // Remove task from DOM
    this.todoCurrentTask.remove();
  };

  addListenersToTasks = () => {
    document
      .querySelectorAll(".todo-list__item-delete__button")
      .forEach((btn) => btn.addEventListener("click", this.deleteTask));

    document
      .querySelectorAll(".todo-list__item")
      .forEach((task) => task.addEventListener("click", this.toggleTask));
  };

  // Returns markup of task
  createTodoMarkup = (todoTitle, isDone) => {
    return ` <li class="todo-list__item ${isDone ? "todo-done" : ""}">
  <input type="checkbox" ${isDone ? "checked" : ""}/>
  <span class="checkmark"></span>
  <span class="todo-list__item-title">${todoTitle}</span><span class="todo-list__item-delete__button">usuń</span>
  </li> `;
  };

  // Create item in todo list
  createToDoItem = (todoTitle, isDone) => {
    // Stores markup of new task
    const todoMarkup = this.createTodoMarkup(todoTitle, isDone);

    // Insert into container new task
    this.todoContainer.insertAdjacentHTML("beforeend", todoMarkup);

    // Add listener to check if task is done
    this.addListenersToTasks();
  };

  insertNewTask = (e) => {
    // Prevent form from refreshing website
    e.preventDefault();

    // Title of task
    const todoTitle = this.todoInput.value;

    // Don't allow to insert empty task
    if (!todoTitle) return;

    this.createToDoItem(todoTitle);

    // Clear input
    this.todoInput.value = "";

    this.todoList.push({ title: todoTitle, isDone: false });
    this.setLocalStorage();
  };

  // Get data from local storage
  getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("todo-tasks"));

    if (!data) return;

    this.todoList = data;

    // Render tasks from local storage
    this.todoList.forEach((task) => {
      this.createToDoItem(task.title, task.isDone);
    });
  };

  // Save data to loal storage
  setLocalStorage = () => {
    localStorage.setItem("todo-tasks", JSON.stringify(this.todoList));
  };

  init = () => {
    // Listens when form is submitted
    this.todoForm.addEventListener("submit", this.insertNewTask);
  };
}

const todoManager = new appManagerToDoList();
