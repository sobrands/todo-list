const navHeadings = ['Inbox', 'Today', 'This Week'];
const navIds = ['inbox', 'today', 'this-week'];
let prevTaskNav;

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
}

function displayTasks(navElement) {
  prevTaskNav.classList.remove('active');
  navElement.classList.add('active');
  prevTaskNav = navElement;
}

function addProject() {
  console.log('adding project');
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