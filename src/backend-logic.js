import { projectFactory } from "../appObjects/project";
import { todoFactory } from "../appObjects/todos";

import { storageAvailable } from "./local-storage";

let projectArr = [];
let displayProjIdx = 0;

const initProjectArr = () => {
  const defaultProject = projectFactory("Default");
  projectArr.push(defaultProject);
  populateStorage();
};

const setProjectArr = () => {
  const projOrder = localStorage.getObj("projOrder");
  for (const projName of projOrder) {
    const todoList = [];
    for (let todoData of localStorage.getObj(projName)) {
      const todo = todoFactory(
        todoData.title,
        todoData.dueDate,
        todoData.priority,
        todoData.isDone,
        todoData.notes,
        false,
      );

      todoList.push(todo);
    }
    const thisProj = projectFactory(projName, todoList);
    projectArr.push(thisProj);
  }
};

const populateProjOrder = () => {
  const projOrder = [];
  for (const project of projectArr) projOrder.push(project.name);
  localStorage.setObj("projOrder", projOrder);
};

const populateTodo = () => {
  for (const project of projectArr) {
    localStorage.setObj(project.name, project.todoList);
  }
};
const populateStorage = () => {
  populateProjOrder();
  populateTodo();
};

const setupBackend = () => {
  if (storageAvailable("localStorage")) {
    if (localStorage.length === 0) {
      initProjectArr();
    } else {
      setProjectArr();
    }
  } else {
    initProjectArr();
  }
};

const getProjectArr = () => {
  return projectArr;
};

const getCurrProjIdx = () => {
  return displayProjIdx;
};

const updateCurrProjIdx = (newIdx) => {
  displayProjIdx = newIdx;
};

const addProject = (name) => {
  for (let project of projectArr) {
    if (project.name === name) return false;
  }

  const newProject = projectFactory(name);
  projectArr.push(newProject);

  updateCurrProjIdx(projectArr.length - 1);

  return true;
};

const addTodo = (title, dueDate, priority, isDone, notes) => {
  const newTodo = todoFactory(title, dueDate, priority, isDone, notes);
  projectArr[getCurrProjIdx()].addTodo(newTodo);
};

export {
  setupBackend,
  getProjectArr,
  addProject,
  addTodo,
  getCurrProjIdx,
  updateCurrProjIdx,
  populateStorage,
};
