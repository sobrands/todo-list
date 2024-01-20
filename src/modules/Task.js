export default class Task {
  #name;
  #dueDate;
  constructor(name, dueDate) {
    this.#name = name;
    dueDate.replace('/','-');
    this.#dueDate = new Date(dueDate);
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get date() {
    return this.#dueDate;
  }
}