const navHeadings = ['Inbox', 'Today', 'This Week'];
const navIds = ['inbox', 'today', 'this-week'];
let prevTaskNav;

function createProjForm() {
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
      projForm.style.display = 'none';
      projForm.reset();
      const addProjBtn = document.getElementById('add-proj');
      addProjBtn.style.display = 'block';
    });
  });

  projForm.appendChild(inputContainer);
  projForm.appendChild(btnContainer);

  const projectNav = document.getElementById('project-list');
  projectNav.appendChild(projForm);
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

  projectNav.setAttribute('id', 'project-list');
  projectNav.classList.add('navigation');
  
  const projectsTitle = document.createElement('h3');
  projectsTitle.setAttribute('id', 'project-title');
  projectsTitle.textContent = 'Projects';

  const addProjects = document.createElement('button');
  addProjects.classList.add('task-nav');
  addProjects.setAttribute('id','add-proj');
  addProjects.textContent = '+ Add Project';

  projectNav.appendChild(projectsTitle);
  projectNav.appendChild(addProjects);

  nav.appendChild(mainNav);
  nav.appendChild(projectNav);

  createProjForm();
}

function displayTasks(navElement) {
  prevTaskNav.classList.remove('active');
  navElement.classList.add('active');
  prevTaskNav = navElement;
}

function addProject() {
  console.log('adding project');
  const form = document.getElementById('proj-form');
  const addProjBtn = document.getElementById('add-proj');
  addProjBtn.style.display = 'none';
  form.style.display = 'grid';
}

function addNavListeners(nav) {
  const tabs = nav.querySelectorAll('button');
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      if (e.target.classList.contains('default-task')) {
        displayTasks(e.target);
      }
      else if (e.target.id === 'add-proj') {
        addProject();
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