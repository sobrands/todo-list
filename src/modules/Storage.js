import ToDoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

export default class Storage {
  static getToDoList() {
    const toDoList = localStorage.getItem('todo');
    if (!toDoList) return new ToDoList();
    
    const todo = Object.assign(new ToDoList(), JSON.parse(toDoList));
    todo.projects = todo.projects.map(proj => Object.assign(new Project(), proj));
    todo.projects.forEach(proj => {
      proj.tasks = proj.tasks.map(task => Object.assign(new Task(), task));
    });
    return todo;
  }

  static saveToDoList(todo) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }
}