import { getProjectArr, addProject, getCurrProjIdx, updateCurrProjIdx } from "../src/backend-logic";
import { displayProjectTodo } from "./todo-display-controller";

import { populateStorage } from "../src/backend-logic";

const updateDisplayedProjectTitle = () => {
  const projectTitleDiv = document.getElementById('project-title');
  const projectArr = getProjectArr();
  projectTitleDiv.innerText = projectArr[getCurrProjIdx()].name;
}

const showingAllProjects = () => {
  const projectList = document.getElementById('project-list');
  return (typeof(projectList) != 'undefined' && projectList != null);
}

const toggleDisplayProjects = () => {
  if (showingAllProjects()) {
    clearAllProjects();
  } else {
    displayAllProjects();
  }
};

const clearAllProjects = () => {
  const displayedProjectList = document.getElementsByClassName('collapsible-project-list')[0];
  displayedProjectList.innerHTML = '';
};

const createAllProjectLi = () => {
  const projectList = document.createElement('ul');
  projectList.id = 'project-list';

  const projectArr = getProjectArr();
  let idx = 0;
  projectArr.forEach((project) => {
    const projectLi = document.createElement('li');
    projectLi.classList.add('project-li');

    const projectBtn = document.createElement('button');
    projectBtn.innerText = project.name;
    projectBtn.index = idx;
    projectBtn.addEventListener('click', (event) => {
      const newDisplayProjIdx = event.target.index;
      updateCurrProjIdx(newDisplayProjIdx);
      updateDisplayedProjectTitle();
      displayProjectTodo(newDisplayProjIdx);
    });

    projectLi.appendChild(projectBtn);
    projectList.appendChild(projectLi);
    idx++;
  }); 

  const displayedProjectList = document.getElementsByClassName('collapsible-project-list')[0];
  displayedProjectList.appendChild(projectList);
}

const displayAllProjects = () => {
  clearAllProjects();
  createAllProjectLi();
}

const hideAddProjectField = () => {
  const projectCol = document.getElementById('projects');

  if (projectCol.children.length > 3) projectCol.removeChild(projectCol.lastChild);
}

const displayAddProjectField = () => {
  const inputTextField = document.createElement('input');
  inputTextField.type = 'text';
  inputTextField.placeholder = 'Input project name';
  inputTextField.name = 'newProjectName';
  inputTextField.pattern = '^(?!\s*$).+';
  inputTextField.id = 'newProjectName';

  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Add';
  submitBtn.type = 'submit';
  submitBtn.classList.add('add-project-field')

  const closeInputTextField = document.createElement('button');
  closeInputTextField.innerText = "Close";
  closeInputTextField.classList.add('add-project-field');
  closeInputTextField.addEventListener('click', hideAddProjectField);

  const addProjBtnDiv = document.createElement('div');
  addProjBtnDiv.id = 'add-project-btn-div';
  addProjBtnDiv.appendChild(submitBtn);
  addProjBtnDiv.appendChild(closeInputTextField);

  const inputForm = document.createElement('form');
  inputForm.appendChild(inputTextField);
  inputForm.appendChild(addProjBtnDiv);

  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const addedProject = addProject(inputForm.elements['newProjectName'].value);

    if (addedProject) {
      if (showingAllProjects) {
        displayAllProjects();
      }
      inputForm.reset();
      hideAddProjectField();
      updateDisplayedProjectTitle();
      updateCurrProjIdx(getProjectArr().length - 1);
      displayProjectTodo(getProjectArr().length - 1);
      populateStorage();
    } else {
      const errMsg = document.createElement('div');
      errMsg.id = 'err-msg';
      errMsg.innerText = 'Project name already exists!';

      inputForm.appendChild(errMsg);
    }
  })

  const projectCol = document.getElementById('projects');
  projectCol.appendChild(inputForm);
}

export { toggleDisplayProjects, displayAddProjectField, hideAddProjectField };