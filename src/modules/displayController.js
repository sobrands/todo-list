const navHeadings = ['Inbox', 'Today', 'This Week'];
const navIds = ['inbox', 'today', 'this-week'];

function createNavBar(nav) {
  const mainNav = document.createElement('div');
  const projectNav = document.createElement('div');

  mainNav.setAttribute('id', 'default-list');
  mainNav.classList.add('navigation');
  for (let i=0; i<navHeadings.length; i++) {
    const heading = document.createElement('button');
    heading.textContent = navHeadings[i];
    heading.setAttribute('id', navIds[i]);
    heading.classList.add('task-nav');
    mainNav.appendChild(heading);
  }

  projectNav.setAttribute('id', 'project-list');
  projectNav.classList.add('navigation');
  
  const projectsTitle = document.createElement('h3');
  projectsTitle.setAttribute('id', 'project-title');
  projectsTitle.textContent = 'Projects';

  const addProjects = document.createElement('button');
  addProjects.classList.add('task-nav');
  addProjects.textContent = '+ Add Project';

  projectNav.appendChild(projectsTitle);
  projectNav.appendChild(addProjects);

  nav.appendChild(mainNav);
  nav.appendChild(projectNav);
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
}

export default {
  initialPage,
}