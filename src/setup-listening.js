import {
  clearProjectTodo,
  displayTodayTodo,
  displayWeekTodo,
  displayAddTodoForm,
  hideAddTodoForm,
} from "../displayController/todo-display-controller";

import {
  toggleDisplayProjects,
  displayAddProjectField,
  hideAddProjectField,
} from "../displayController/project-display-controller";

const setupListening = () => {
  const todayTodoBtn = document.getElementById("today-todo-btn");
  todayTodoBtn.addEventListener("click", () => {
    clearProjectTodo();
    displayTodayTodo();
  });

  const weekTodoBtn = document.getElementById("week-todo-btn");
  weekTodoBtn.addEventListener("click", () => {
    clearProjectTodo();
    displayWeekTodo();
  });

  const expandProjectsBtn = document.getElementById("expand-projects-btn");
  expandProjectsBtn.addEventListener("click", toggleDisplayProjects);

  const addProjectBtn = document.getElementById("add-project-btn");
  addProjectBtn.addEventListener("click", () => {
    hideAddProjectField();
    displayAddProjectField();
  });

  const addTodoBtn = document.getElementById("add-todo-btn");
  addTodoBtn.addEventListener("click", () => {
    hideAddTodoForm();
    displayAddTodoForm();
  });
};

export { setupListening };
