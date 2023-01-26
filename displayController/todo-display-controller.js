import { addDays, isWithinInterval } from "date-fns";

import {
  addTodo,
  getProjectArr,
  getCurrProjIdx,
  populateStorage,
} from "../src/backend-logic";
import { deleteTodoFromProj } from "../actionLogic/action-project";
import {
  updateTodoIsDone,
  toggleTodoShowNotes,
} from "../actionLogic/action-todo";

const priorityToColor = new Map([
  [1, "green"],
  [2, "yellow"],
  [3, "red"],
]);

const updateDisplayTitle = (text) => {
  const projectTitle = document.getElementById("project-title");
  projectTitle.innerText = text;
};

const displayTodayTodo = () => {
  updateDisplayTitle("Today");

  const todayDate = new Date().toJSON().slice(0, 10);
  const displayTodoContainer = document.getElementById("project-todo");
  const projectArr = getProjectArr();

  for (let projIdx in projectArr) {
    for (let todoIdx in projectArr[projIdx].todoList) {
      const todo = projectArr[projIdx].todoList[todoIdx];
      if (todo.dueDate === todayDate) {
        const todoContainer = createToDoContainer(todo, false, false);
        displayTodoContainer.appendChild(todoContainer);
      }
    }
  }
};

const displayWeekTodo = () => {
  updateDisplayTitle("This week");

  const startOfWeekDate = new Date();
  const endOfWeekDate = addDays(startOfWeekDate, 6);

  const displayTodoContainer = document.getElementById("project-todo");
  const projectArr = getProjectArr();

  for (let projIdx in projectArr) {
    for (let todoIdx in projectArr[projIdx].todoList) {
      const todo = projectArr[projIdx].todoList[todoIdx];
      const todoDueDate = new Date(todo.dueDate);
      if (
        isWithinInterval(todoDueDate, {
          start: startOfWeekDate,
          end: endOfWeekDate,
        })
      ) {
        const todoContainer = createToDoContainer(todo, false, false);
        displayTodoContainer.appendChild(todoContainer);
      }
    }
  }
};

const displayDoneTodo = () => {
  console.log("displaying done todos!");
};

const hideAddTodoForm = () => {
  const rightCol = document.getElementById("right-col");

  if (rightCol.children.length > 2) {
    rightCol.removeChild(rightCol.children[1]);
  }
};

const displayAddTodoForm = () => {
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("placeholder", "Todo title");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("pattern", "^(?!s*$).+");
  titleInput.id = "title";

  const dueDate = document.createElement("input");
  dueDate.name = "dueDate";
  dueDate.setAttribute("type", "date");
  const todayDate = new Date().toJSON().slice(0, 10);
  dueDate.setAttribute("value", todayDate);
  dueDate.id = "dueDate";

  const priority = document.createElement("select");
  priority.name = "priority";
  priority.id = "priority";
  const lowPriority = document.createElement("option");
  lowPriority.value = "1";
  lowPriority.text = "P1 🟩";
  priority.appendChild(lowPriority);
  const midPriority = document.createElement("option");
  midPriority.value = "2";
  midPriority.text = "P2 🟨";
  priority.appendChild(midPriority);
  const highPriority = document.createElement("option");
  highPriority.value = "3";
  highPriority.text = "P3 🟥";
  priority.appendChild(highPriority);

  const notesField = document.createElement("textarea");
  notesField.name = "notes";
  notesField.maxLength = "1000";
  notesField.id = 'add-todo-notes-field';
  notesField.placeholder = 'Notes here (optional)';

  const submitBtn = document.createElement("input");
  submitBtn.type = "submit";
  submitBtn.value = "Add";
  submitBtn.classList.add('add-todo-form-btn');

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close form";
  closeBtn.addEventListener("click", hideAddTodoForm);
  closeBtn.classList.add('add-todo-form-btn');

  const addTodoForm = document.createElement("form");
  addTodoForm.id = 'add-todo-form';
  addTodoForm.appendChild(titleInput);
  addTodoForm.appendChild(dueDate);
  addTodoForm.appendChild(priority);
  addTodoForm.appendChild(notesField);
  addTodoForm.appendChild(submitBtn);
  addTodoForm.appendChild(closeBtn);

  addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(
      addTodoForm.elements["title"].value,
      addTodoForm.elements["dueDate"].value,
      addTodoForm.elements["priority"].value,
      false,
      addTodoForm.elements["notes"].value
    );
    addTodoForm.reset();
    clearProjectTodo();
    displayProjectTodo(getCurrProjIdx());
    populateStorage();
  });

  const rightCol = document.getElementById("right-col");
  rightCol.insertBefore(addTodoForm, rightCol.childNodes[1]);
};

const clearProjectTodo = () => {
  const displayTodoContainer = document.getElementById("project-todo");
  displayTodoContainer.innerHTML = "";
};

const handleUpdateDone = (currProjIdx, event) => {
  const projArr = getProjectArr();
  updateTodoIsDone(projArr[currProjIdx].todoList[event.srcElement.index]);
  populateStorage();
  displayProjectTodo(currProjIdx);
};

const handleShowDropDown = (currProjIdx, event) => {
  const projectArr = getProjectArr();
  toggleTodoShowNotes(projectArr[currProjIdx].todoList[event.srcElement.index]);
  displayProjectTodo(currProjIdx);
};

const createToDoContainer = (todo, haveDropDownBtn, haveDelBtn, idx = 0) => {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const topRowDiv = document.createElement("div");
  topRowDiv.classList.add("todo-top-row");

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn");
  doneBtn.classList.add(priorityToColor.get(parseInt(todo.priority)));
  doneBtn.index = idx;
  doneBtn.addEventListener("click", (event) => {
    handleUpdateDone(getCurrProjIdx(), event);
  });

  const titleDiv = document.createElement("div");
  titleDiv.innerText = todo.title;

  const dueDateDiv = document.createElement("div");
  dueDateDiv.innerText = todo.dueDate;

  topRowDiv.appendChild(doneBtn);
  topRowDiv.appendChild(titleDiv);
  topRowDiv.appendChild(dueDateDiv);

  if (haveDropDownBtn) {
    const dropDownBtn = document.createElement("button");
    if (todo.showNotes) {
      dropDownBtn.innerText = "🔼";
    } else {
      dropDownBtn.innerText = "🔽";
    }
    dropDownBtn.index = idx;
    dropDownBtn.classList.add("todo-drop-down-btn");
    dropDownBtn.addEventListener("click", (event) => {
      handleShowDropDown(getCurrProjIdx(), event);
    });

    topRowDiv.appendChild(dropDownBtn);
  }

  if (haveDelBtn) {
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.index = idx;
    delBtn.classList.add("todo-del-btn");
    delBtn.addEventListener("click", (event) => {
      event.preventDefault();
      deleteTodoFromProj(getCurrProjIdx(), event.srcElement.index);
      displayProjectTodo();
      populateStorage();
    });

    topRowDiv.appendChild(delBtn);
  }

  todoContainer.appendChild(topRowDiv);

  if (todo.showNotes) {
    const btmRowDiv = document.createElement("div");
    btmRowDiv.innerText = todo.notes;
    btmRowDiv.classList.add("todo-bottom-row");

    todoContainer.appendChild(btmRowDiv);
  }

  return todoContainer;
};

const createTodoDiv = (projIdx = 0) => {
  const displayTodoContainer = document.getElementById("project-todo");
  const projectArr = getProjectArr();

  const todoList = projectArr[projIdx].todoList;
  for (let idx in todoList) {
    const todo = todoList[idx];
    if (!todo.isDone) {
      const todoContainer = createToDoContainer(todo, true, true, idx);
      displayTodoContainer.appendChild(todoContainer);
    }
  }
};

const displayProjectTodo = (idx) => {
  clearProjectTodo();
  createTodoDiv(idx);
};

export {
  clearProjectTodo,
  displayTodayTodo,
  displayWeekTodo,
  displayDoneTodo,
  displayAddTodoForm,
  hideAddTodoForm,
  displayProjectTodo,
};
