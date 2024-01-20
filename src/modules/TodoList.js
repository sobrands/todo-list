import Project from './Project';
import Task from './Task';

export default class toDoList {
  #projects;
  constructor() {
    this.#projects = [];
  }

  get projects() {
    return this.#projects;
  }

  projExists(projectName) {
    const res = this.#projects.filter(project => {
      return (project.name.toLowerCase() === projectName.toLowerCase());
    })
    if (res.length > 0) return true;
    return false;
  }
   
  addProj(project) {
    if (!this.projExists(project)) this.#projects.push(new Project(project));
    else console.error("Project already exists");
  }

  addTaskToProject(form, projectElement) {
    let projectName;
    if (form.project === undefined) projectName = projectElement.textContent;
    else projectName = form.project.value;
    if (!this.projExists(projectName)) {
      alert("Project does not exist!");
      return false;
    }
    for (const project of this.#projects) {
      if (project.name.toLowerCase() === projectName.toLowerCase()) {
        project.addTask(new Task(form.name.value, form.date.value));
        return true;
      }
    }
    return true;
  }

  getTasksFromProject(projectName) {
    for (const project of this.#projects) {
      if (project.name === projectName) return project.tasks;
    }
  }

  displayAllTasks() {
    let tasks = [];
    for (const project of this.#projects) {
      tasks.push(project.tasks);
    }
    return tasks.flat();
  }

  displayTodayTasks() {
    let tasks = [];
    for (const project of this.#projects) {
      tasks.push(project.getTasksToday());
    }
    return tasks.flat();
  }

  displayWeekTasks() {
    let tasks = [];
    for (const project of this.#projects) {
      tasks.push(project.getTasksThisWeek());
    }
    return tasks.flat();
  }
}