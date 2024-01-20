import { isToday, isThisWeek } from 'date-fns';

export default class Project {
  #name;
  #tasks;
  constructor(name) {
    this.#name = name;
    this.#tasks = [];
  }

  get name() {
    return this.#name;
  }

  get tasks() {
    return this.#tasks;
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  getTasksToday() {
    const res = this.#tasks.filter(task => {
      return (isToday(task.date));
    })
    return res;
  }

  getTasksThisWeek() {
    const res = this.#tasks.filter(task => {
      return (isThisWeek(task.date, {weekStartsOn: 1}));
    })
    return res;
  }
}