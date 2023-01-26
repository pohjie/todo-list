import { projectFactory } from "../appObjects/project";
import { getProjectArr } from "../src/backend-logic";

const createProject = (name, todoList=[]) => {
  let project = projectFactory(name, todoList);

  return project;
}

const deleteTodoFromProj = (currProjIdx, todoIdx) => {
  const projectArr = getProjectArr();
  projectArr[currProjIdx].deleteTodo(todoIdx);
}

export { createProject, deleteTodoFromProj };