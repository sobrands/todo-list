import Project from './Project'

export default class toDoList {
  #projects;
  constructor() {
    this.#projects = [];
  }

  get projects() {
    return this.#projects;
  }
  
  addProj(project) {
    this.#projects.push(new Project(project));
  }
}