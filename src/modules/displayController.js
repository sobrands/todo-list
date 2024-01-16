import ToDoList from './TodoList';

const navHeadings = ['Inbox', 'Today', 'This Week'];
const navIds = ['inbox', 'today', 'this-week'];
let prevTaskNav;
const toDoList = new ToDoList();


function refreshProjectNav() {
  const projList = document.getElementById('project-list');
  const projects = toDoList.projects;

  projList.textContent = '';
  for (const proj of projects) {
    const project = document.createElement('button');
    project.textContent = proj.name;
    project.classList.add('project');
    project.classList.add('task-nav');
    project.addEventListener('click', e => {
      displayTasks(e.target);
    })
    projList.appendChild(project);
  }
}

function createProjForm(projNav) {
  const projForm = document.createElement('form');
  projForm.setAttribute('id', 'proj-form');

  const inputContainer = document.createElement('div');
  const nameInput = document.createElement('input');
  const btnContainer = document.createElement('div');
  const confirmBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');

  inputContainer.setAttribute('id', 'name-input');
  nameInput.setAttribute('id', 'name');

  btnContainer.setAttribute('id', 'action-btns');
  confirmBtn.setAttribute('id', 'confirm');
  cancelBtn.setAttribute('id', 'cancel');

  confirmBtn.textContent = 'Enter';
  cancelBtn.textContent = 'Cancel';

  inputContainer.appendChild(nameInput);

  btnContainer.appendChild(confirmBtn);
  btnContainer.appendChild(cancelBtn);

  const btns = btnContainer.querySelectorAll('button');

  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.id === 'confirm' && nameInput.value !== '') {
        toDoList.addProj(nameInput.value);
        refreshProjectNav();
      }
      projForm.style.display = 'none';
      projForm.reset();
      const addProjBtn = document.getElementById('add-proj');
      addProjBtn.style.display = 'block';
    });
  });

  projForm.appendChild(inputContainer);
  projForm.appendChild(btnContainer);

  projNav.appendChild(projForm);
}

function createNavBar(nav) {
  const mainNav = document.createElement('div');
  const projectNav = document.createElement('div');

  mainNav.setAttribute('id', 'default-list');
  mainNav.classList.add('navigation');
  for (let i=0; i<navHeadings.length; i++) {
    const heading = document.createElement('button');
    heading.textContent = navHeadings[i];
    heading.setAttribute('id', navIds[i]);
    heading.classList.add('task-nav', 'default-task');
    mainNav.appendChild(heading);
  }

  projectNav.setAttribute('id', 'project');
  projectNav.classList.add('navigation');
  
  const projectsTitle = document.createElement('h3');
  projectsTitle.setAttribute('id', 'project-title');
  projectsTitle.textContent = 'Projects';

  const addProjects = document.createElement('button');
  addProjects.classList.add('task-nav');
  addProjects.setAttribute('id','add-proj');
  addProjects.textContent = '+ Add Project';

  const projectList = document.createElement('div');
  projectList.setAttribute('id','project-list');

  projectNav.appendChild(projectsTitle);
  projectNav.appendChild(addProjects);
  createProjForm(projectNav);
  projectNav.appendChild(projectList);

  nav.appendChild(mainNav);
  nav.appendChild(projectNav);
}

function displayDefaultTask(navElement, mainContent) {
  
}

function displayProject(navElement, mainContent) {
  
}

function displayTasks(navElement) {
  prevTaskNav.classList.remove('active');
  navElement.classList.add('active');
  prevTaskNav = navElement;

  const mainContent = document.getElementById('main-content');
  mainContent.textContent = '';

  const title = document.createElement('h1');
  title.setAttribute('id', 'main-title');
  title.textContent = navElement.textContent;
  
  if (navElement.getAttribute('id') === 'inbox' || navElement.classList.contains('project')) {
    const addTaskBtn = document.createElement('button');
    if (navElement.classList.contains('project')) addTaskBtn.setAttribute('id', 'add-task-project');
    else addTaskBtn.setAttribute('id', 'add-task-default');
    addTaskBtn.textContent = 'Add Task +';
    title.appendChild(addTaskBtn);  
  }

  mainContent.appendChild(title);

  if (navElement.classList.contains('default-task')) {
    displayDefaultTask(navElement, mainContent);
  }
  else if (navElement.classList.contains('project')) {
    displayProject(navElement, mainContent);
  }
}

function addProject() {
  console.log('adding project');
  const form = document.getElementById('proj-form');
  const addProjBtn = document.getElementById('add-proj');
  addProjBtn.style.display = 'none';
  form.style.display = 'grid';
}

function addNavListeners(nav) {
  const tabs = nav.querySelectorAll('button.task-nav');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (e.target.id === 'add-proj') {
        addProject();
      }
      else {
        displayTasks(e.target);
      }
    });
  });
}

function initialPage() {
  const body = document.getElementById('main');

  const banner = document.createElement('div');
  banner.setAttribute('id', 'banner');
  
  const title = document.createElement('h1');
  title.setAttribute('id', 'title');
  title.textContent = "Todo List";

  banner.appendChild(title);

  const nav = document.createElement('div');
  nav.setAttribute('id', 'nav');

  const contentBody = document.createElement('div');
  contentBody.setAttribute('id', 'main-content');

  body.appendChild(banner);
  body.appendChild(nav);
  body.appendChild(contentBody);

  createNavBar(nav);
  const inbox = document.querySelector('#inbox');
  prevTaskNav = inbox;
  displayTasks(inbox);
  addNavListeners(nav);
}

export default {
  initialPage,
}