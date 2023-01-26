import "./style.css";

const setupFrontend = () => {
  const body = document.body;

  // Add the header
  const headerDiv = document.createElement("div");
  headerDiv.id = "header";
  headerDiv.innerHTML =
    '<span class="material-symbols-outlined">done_all</span> Todo';
  body.appendChild(headerDiv);

  /*
    container: 2 sections
    1. left-col
    2. right-col
  */
  const containerDiv = document.createElement("div");
  containerDiv.id = "container";

  /*
    left-col: 3 sections
    1. time-view-project
    2. empty-space
    3. projects
  */
  const leftColDiv = document.createElement("div");
  leftColDiv.id = "left-col";

  /*
    time-view-project: 3 buttons
    1. today-project-btn
    2. week-project-btn
    3. done-project-btn
  */
  const timeViewTodoDiv = document.createElement("div");
  timeViewTodoDiv.id = "time-view-todo";

  const todayTodoBtn = document.createElement("button");
  todayTodoBtn.innerHTML = '<span class="material-symbols-outlined">today</span> Today';
  todayTodoBtn.id = "today-todo-btn";

  const weekTodoBtn = document.createElement("button");
  weekTodoBtn.innerHTML = '<span class="material-symbols-outlined">calendar_view_week</span> This week';
  weekTodoBtn.id = "week-todo-btn";

  timeViewTodoDiv.appendChild(todayTodoBtn);
  timeViewTodoDiv.appendChild(weekTodoBtn);

  /*
  projects: 2 buttons, 1 div
*/
  const projectsDiv = document.createElement("div");
  projectsDiv.id = "projects";

  const expandProjectsBtn = document.createElement("button");
  expandProjectsBtn.id = "expand-projects-btn";
  expandProjectsBtn.innerHTML = '<span class="material-symbols-outlined">expand_more</span> Projects';

  const projectListDiv = document.createElement("div");
  projectListDiv.classList.add("collapsible-project-list");

  const addProjectBtn = document.createElement("button");
  addProjectBtn.id = "add-project-btn";
  addProjectBtn.innerHTML = '<span class="material-symbols-outlined">add</span> Add project';

  projectsDiv.appendChild(expandProjectsBtn);
  projectsDiv.appendChild(projectListDiv);
  projectsDiv.appendChild(addProjectBtn);

  leftColDiv.appendChild(timeViewTodoDiv);
  leftColDiv.appendChild(projectsDiv);

  /*
  right-col: 2 divs and 1 button
*/
  const rightColDiv = document.createElement("div");
  rightColDiv.id = "right-col";

  const projectHeaderDiv = document.createElement('div');
  projectHeaderDiv.id = 'project-header';

  const projectTitleHeader = document.createElement("h2");
  projectTitleHeader.id = "project-title";
  projectTitleHeader.innerText = "Default";

  const addTodoBtn = document.createElement("button");
  addTodoBtn.id = "add-todo-btn";
  addTodoBtn.innerText = "Add todo";

  projectHeaderDiv.appendChild(projectTitleHeader);
  projectHeaderDiv.appendChild(addTodoBtn);

  const projectTodoDiv = document.createElement("div");
  projectTodoDiv.id = "project-todo";
  projectTodoDiv.innerText = "Todos";

  rightColDiv.appendChild(projectHeaderDiv);
  rightColDiv.appendChild(projectTodoDiv);

  containerDiv.appendChild(leftColDiv);
  containerDiv.appendChild(rightColDiv);

  body.appendChild(containerDiv);
};


export { setupFrontend };