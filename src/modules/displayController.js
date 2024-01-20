import ToDoList from './TodoList';
import Storage from './Storage';

const navHeadings = ['Inbox', 'Today', 'This Week'];
const navIds = ['inbox', 'today', 'this-week'];
let prevTaskNav;
const toDoList = Storage.getToDoList();
Storage.saveToDoList(toDoList);

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

  btnContainer.classList.add('action-btns');
  confirmBtn.classList.add('confirm');
  cancelBtn.classList.add('cancel');

  confirmBtn.textContent = 'Enter';
  cancelBtn.textContent = 'Cancel';

  inputContainer.appendChild(nameInput);

  btnContainer.appendChild(confirmBtn);
  btnContainer.appendChild(cancelBtn);

  const btns = btnContainer.querySelectorAll('button');

  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.classList.contains('confirm') && nameInput.value !== '') {
        toDoList.addProj(nameInput.value);
        Storage.saveToDoList(toDoList);
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

function generateInput(form, inputLabel, type) {
  const inputCtn = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const error = document.createElement('p');
  
  const inputId = inputLabel.toLowerCase().replace(' ', '-');
  label.setAttribute('for', inputId);
  label.textContent = `${inputLabel}: `;

  input.setAttribute('type', type);
  input.setAttribute('name', inputId);
  input.setAttribute('id', inputId);
  input.addEventListener('focus', () => {
    error.textContent = '';
  });

  error.setAttribute('id', `user-${inputId}-error`);
  
  inputCtn.classList.add('input-container');

  inputCtn.appendChild(label);
  inputCtn.appendChild(input);
  inputCtn.appendChild(error);
  form.appendChild(inputCtn);
}

function validateForm(form, id) {
  // Validate name input
  if (form.name.value === '' || form.name.value=== null) {
    const error = document.getElementById('user-name-error');
    error.textContent = "Field must not be empty!";
    return false;
  }

  // Validate date input
  if (form.date.value === '' || form.date.value=== null) {
    const error = document.getElementById('user-date-error');
    error.textContent = "Field must not be empty!";
    return false;
  }

  // Validate project input
  if (id === 'add-task-default') {
    if (form.project.value === '' || form.project.value=== null) {
      const error = document.getElementById('user-project-error');
      error.textContent = "Field must not be empty!";
      return false;
    }
  }

  return true;
}

function addTaskDialog(id, project) {
  const dialog = document.createElement('dialog');
  const taskForm = document.createElement('form');
  taskForm.setAttribute('method', 'dialog');

  generateInput(taskForm, 'Name', 'text');
  generateInput(taskForm, 'Date', 'date');
  if (id === 'add-task-default') generateInput(taskForm, 'Project', 'text');

  const btnCtn = document.createElement('div');
  const confirmBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');

  confirmBtn.classList.add('confirm');
  confirmBtn.textContent = 'Confirm';

  cancelBtn.classList.add('cancel');
  cancelBtn.textContent = 'Cancel';

  btnCtn.classList.add('action-btns');
  btnCtn.appendChild(confirmBtn);
  btnCtn.appendChild(cancelBtn);

  taskForm.setAttribute('id', 'task-form');

  taskForm.appendChild(btnCtn);
  dialog.appendChild(taskForm);
  document.body.appendChild(dialog);

  const btns = btnCtn.querySelectorAll('button');
  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.classList.contains('confirm')) {
        if (validateForm(taskForm, id)) {
          if(toDoList.addTaskToProject(taskForm, project)) {
            Storage.saveToDoList(toDoList);
            dialog.close();
            dialog.remove();
          }
        }
      }
      else {
        dialog.close();
        dialog.remove();
      }
      displayTasks(prevTaskNav);
    })
  })
  
  dialog.showModal();
}

function addTask(content, task, project = false) {
  const taskCtn = document.createElement('div');
  const taskName = document.createElement('p');

  taskCtn.classList.add('task');

  taskName.textContent = task.name;

  taskCtn.appendChild(taskName);

  if (project) {
    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.setAttribute('id', 'task-delete');
    taskCtn.appendChild(delBtn);
  }

  content.appendChild(taskCtn);
}

function showTasks(mainContent, tasks, project = false) {
  const content = mainContent.querySelector('#main-body');

  for (const task of tasks) addTask(content, task, project);
}

function displayDefaultTask(navElement, mainContent) {
  let tasks = [];
  if (navElement.textContent === 'Inbox') tasks = toDoList.displayAllTasks();
  else if (navElement.textContent === 'Today') tasks = toDoList.displayTodayTasks();
  else if (navElement.textContent === 'This Week') tasks = toDoList.displayWeekTasks();

  showTasks(mainContent, tasks);
}

function displayProject(navElement, mainContent) {
  const project = navElement.textContent;
  const tasks = toDoList.getTasksFromProject(project);

  showTasks(mainContent, tasks, true);
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

  const contentBody = document.createElement('div');
  contentBody.setAttribute('id', 'main-body');
  
  if (navElement.getAttribute('id') === 'inbox' || navElement.classList.contains('project')) {
    const addTaskBtn = document.createElement('button');
    if (navElement.classList.contains('project')) addTaskBtn.setAttribute('id', 'add-task-project');
    else addTaskBtn.setAttribute('id', 'add-task-default');
    addTaskBtn.textContent = 'Add Task +';
    addTaskBtn.classList.add('add-task');
    addTaskBtn.addEventListener('click', (e) => {
      addTaskDialog(e.target.id, navElement);
    })
    title.appendChild(addTaskBtn);  
  }

  mainContent.appendChild(title);
  mainContent.appendChild(contentBody);

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
  refreshProjectNav();
  const inbox = document.querySelector('#inbox');
  prevTaskNav = inbox;
  displayTasks(inbox);
  addNavListeners(nav);
}

export default {
  initialPage,
}